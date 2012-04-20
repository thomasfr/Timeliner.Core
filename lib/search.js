var redis = require('redis');
var client = redis.createClient();
var clientDb1 = redis.createClient();
clientDb1.select(1);
var parseText = require('./parseText');
var getIndeyKeys = require('./getIndexKeys');

/**
 *
 * @param query String
 * @param callback Function function(error, String[documentIDs])
 */
function search(query, callback) {
    "use strict";
    parseText(query, function (error, keys) {
        if (error) {
            return callback(error, null);
        }
        var args = [];
        // Create key for the stored search
        var searchKey = keys.join('&&');
        var searchIndexKey = 'S:' + searchKey;
        var multi = client.multi();
        keys.forEach(function (key) {
            multi.sadd("AS:" + key, searchKey);
        });
        multi.exec(function (err, replies) {
            if (err) {
                console.warn(err);
                return;
            }
            //console.log("Added AS ", replies);
        });

        args.push(searchIndexKey);

        // 2nd argument is the number of keys we want to "UNION"
        args.push(keys.length);

        getIndeyKeys(keys, function (error, indexKeys) {
            // we merge the keys array into args array
            // keys beginning with index 2
            args = args.concat(indexKeys);
        });

        // This is important so that newly created
        // sorted set will have the same score as before.
        args.push("AGGREGATE");
        args.push("MIN");
        // last argument is the callback
        args.push(function (error) {
            if (error) {
                return callback(error, null);
            }
            // After the new key with the document ids is generated we return it in reverse order
            // this will be chronologically reversed. Newest ones are first
            client.zrevrange(searchIndexKey, 0, -1, function (error, ids) {
                var multiDb1 = clientDb1.multi();
                ids.forEach(function (id) {
                    multiDb1.hgetall('T:' + id);
                });
                multiDb1.exec(function (error, documents) {
                    if (error) {
                        return callback(error, null);
                    }
                    callback(null, documents, searchKey);
                });
            });
        });

        // UNION = ODER
        // INTER = UND
        client.zinterstore.apply(client, args);
    });
}

module.exports = search;