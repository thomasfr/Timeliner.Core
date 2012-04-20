var redis = require('redis');
var pubSub = redis.createClient();
var index = require('./lib/index');

function onIndexComplete(err, tokens) {
    "use strict";
    if (err) {
        return console.warn(err);
    } else {
        return console.log("index complete.\n");
    }
}

pubSub.subscribe('document:new');
pubSub.on('message', function (channel, message) {
    "use strict";
    try {
        var document = JSON.parse(message);
        if (document.id && document.text && document.user) {
            console.log("new document: ", JSON.stringify(document.text));
            index(document, function (err, tokens) {
                if (err) {
                    return console.warn(err);
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});