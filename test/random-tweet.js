var redis = require('redis');
var clientDb1 = redis.createClient();
clientDb1.select(1);
var sendDocument = require('../lib/sendDocument');

var util = require('util');
var sentTweets = 0;

function getRandomKey(callback) {
    clientDb1.randomkey(function (error, key) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        if (key.search(/^T:/) !== -1) {
            return callback(key);
        }
        process.nextTick(function () {
            return getRandomKey(callback);
        });
    });
}

function processRandomKey(key) {
    clientDb1.hgetall(key, function (err, tweet) {
        if (err) {
            return console.error(err);
        }
        try {
            if (tweet) {
                var date = new Date();
                sendDocument(tweet, function (error) {
                    if (!error) {
                        console.log("#" + (++sentTweets) + " sent");
                        console.log(tweet.text + "\n");
                    }
                });
            }
        } catch (error) {
            return console.error(error);
        }
    });
}

function doFakeTweeting() {
    return getRandomKey(processRandomKey);
}

setInterval(doFakeTweeting, 1);