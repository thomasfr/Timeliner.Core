var redis = require('redis');
var client = redis.createClient();

function sendDocument(document, callback) {
    "use strict";
    callback = callback || function () {
    };
    try {
        var documentString = JSON.stringify(document);
        client.publish('document:new', documentString);
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = sendDocument;