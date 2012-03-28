var redis = require('redis');
var client = redis.createClient('run/redis.sock');
var normalize = require('./lib/normalize.js');

client.on("error", function (err) {
    console.log("Error " + err);
});


var sampleTexts = require('./lib/samples.js');
var sample1 = sampleTexts.sample1;
var docId = "sample1";

var normalizedTokens = normalize(sample1);

// Start a Multi Bulk Command
// So for each document only one redis command will be executed
var multi = client.multi();
normalizedTokens.forEach(function (tokenParts) {
    tokenParts.forEach(function (part) {
        // for each token part we add a set with the given doc id
        multi.sadd('WORD_' + part, docId);
    });
});

// execute all buffered commands
multi.exec(function (err, replies) {
    console.log(replies);
});


