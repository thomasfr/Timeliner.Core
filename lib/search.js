var redis = require('redis');
var client = redis.createClient('run/redis.sock');
var normalize = require('./normalize.js');
var util = require('util');

module.exports = function (query, callback) {
    var queryTokens = normalize(query);
    var keys = [];
    queryTokens.forEach(function (tokenParts) {
        tokenParts.forEach(function (part) {
            keys.push("W:" + part);
        });
    });

    var args = [];
    // Create key for the stored search
    var searchKey = 'S:' + keys.join('|');
    args.push(searchKey);
    // 2nd argument is the number of keys we want to "UNION"
    args.push(keys.length);
    // we merge the keys array into args array
    // keys beginning with index 2
    args = args.concat(keys);
    // last argument is the callback
    args.push(getStoreCallback(searchKey, callback));
    client.zunionstore.apply(client, args);
}

function getStoreCallback(searchKey, callback) {
    return function (err, replies) {
        if (err) return callback(err, null);
        client.zrange(searchKey, 0, -1, callback);
    }
}