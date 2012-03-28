var redis = require('redis');
var client = redis.createClient('run/redis.sock');
var normalize = require('./lib/normalize.js');

client.on("error", function (err) {
    console.log("Error " + err);
});


var query = "redis";


var queryTokens = normalize(query);

var keys = [];
queryTokens.forEach(function (tokenParts) {
    tokenParts.forEach(function (part) {
        keys.push("WORD_" + part);
    });
});

var args = keys;
args.push(function (err, replies) {
    console.log(arguments);
});
console.log(args);
client.sinter.apply(client, args);