var redis = require('redis');
var client = redis.createClient('run/redis.sock');
var normalize = require('./normalize.js');

module.exports = function (query, callback) {
    var queryTokens = normalize(query);
    var keys = [];
    queryTokens.forEach(function (tokenParts) {
        tokenParts.forEach(function (part) {
            keys.push("W:" + part);
        });
    });

    var args = keys;
    args.push(callback);
    client.sinter.apply(client, args);
}