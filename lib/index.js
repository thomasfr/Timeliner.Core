var redis = require('redis');
var client = redis.createClient('run/redis.sock');
var normalize = require('./normalize.js');

module.exports = function (document, callback) {

    var text = document.text;
    var id = document.id;

    if (!text || !id) {
        callback("invalid document", null);
        return false;
    }

    var normalizedTokens = normalize(text);

    // Start a Multi Bulk Command
    // So for each document only one redis command will be executed
    var multi = client.multi();
    normalizedTokens.forEach(function (tokenParts) {
        tokenParts.forEach(function (part) {
            // for each token part we add a set with the given doc id
            multi.sadd('W:' + part, id);
        });
    });

    // execute all buffered commands
    multi.exec(function (err, replies) {
        if (err) {
            callback(err, null);
            return false;
        }
        else {
            callback(null, normalizedTokens);
            return true;
        }
    });

}