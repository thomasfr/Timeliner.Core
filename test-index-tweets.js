var redis = require('redis');

var pubSub = redis.createClient();
var client = redis.createClient('run/redis.sock');

var index = require('./lib/index.js');
var util = require('util');

function onIndexComplete(err, tokens) {
    if (err) {
        console.error(err);
        return false;
    }
    else {
        console.log("index complete.\n");
        return true;
    }
}

pubSub.subscribe('tweet:new');
pubSub.on('message', function (channel, message) {
    try {
        var document;
        message = JSON.parse(message);
        if (message.id && message.text && message.user && message.user.lang) {
            document = {
                id:message.id,
                text:message.text
            }
            console.log("new document: ", JSON.stringify(document));
            process.nextTick(function () {
                index(document, function (err, tokens) {
                    if (onIndexComplete(err, tokens)) {
                        client.hmset('T:' + message.id, {
                            tokens:JSON.stringify(tokens),
                            tweet:JSON.stringify(message)
                        });
                    }
                });
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});