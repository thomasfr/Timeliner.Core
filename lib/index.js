var parseText = require('./parseText');
var getIndexKeys = require('./getIndexKeys');

function index(document, client, callback) {
    "use strict";

    var text = document.text || null;
    var id = document.id || null;

    if (!text || !id) {
        return callback("invalid document", null);
    }

    client.incr('G:NEXTSCORE', function (err, nextScore) {
        if (err) {
            return callback(err, null);
        }

        parseText(text, function (error, keys) {
            // Start a Multi Bulk Command
            // So for each document only one redis command (socket.write) will be executed
            /*
             var multi = client.multi();
             keys.forEach(function (key) {
             multi.smembers("AS:" + key);
             });
             multi.exec(function (error, replies) {
             if (error) {
             console.error(error);
             return false;
             }
             var i = 0, l = replies.length, searches, search;
             for (i; i < l; i++) {
             searches = replies[i];
             if (searches.length <= 0) {
             return false;
             }
             var j = 0, jl = searches.length;
             for (j; j < jl; j++) {
             search = searches[j];
             var searchKey = "S:" + search;
             var newDocumentForSearchKey = 'search:' + search + ':new';
             console.log("FOUND SEARCHES for key: " + keys[i] + " ", newDocumentForSearchKey, text);
             client.zadd(searchKey, nextScore, id);
             // TODO: Move to redis LUA scripting
             // pubSubClient.publish(newDocumentForSearchKey, JSON.stringify(document));
             }
             }
             });
             */

            var multi = client.multi();
            getIndexKeys(keys, function (error, indexKeys) {
                client.eval("return table.getn(ARGV)", 2, "foo", "bar", "fooval", "barval", function () {
                    console.log(arguments);
                });
                indexKeys.forEach(function (indexKey) {
                    // for each token part we add a set with the given doc id
                    multi.zadd(indexKey, nextScore, id);
                });
            });

            // execute all buffered commands
            multi.exec(function (err, replies) {
                if (err) {
                    callback(err, null);
                    return false;
                } else {
                    callback(null, keys);
                    return true;
                }
            });
        });
    });
}

module.exports = index;