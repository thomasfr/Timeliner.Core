var redis = require('redis');
var client = redis.createClient('run/redis.sock');

var util = require('util');

function getRandomKey(callback) {
    client.randomkey(function (error, key) {
        if (error) {
            console.error(error);
            return false;
        }
        if (key.search(/^T:/) !== -1) return callback(key);
        process.nextTick(function () {
            return getRandomKey(callback)
        });
    });
}

function doFakeTweeting() {
    process.nextTick(function () {
        return getRandomKey(processRandomKey);
    });
}

function processRandomKey(key) {
    client.hgetall(key, function (err, tweetHash) {
        if (err) return console.error(err);
        try {
            var tweet = JSON.parse(tweetHash.tweet || null);
            if (tweet) {
                var date = new Date();
                tweet.id = date.getTime();

                console.log(util.inspect(tweet, false, 5, true));
            }
        }
        catch (error) {
            console.error(error);
        }
    })
}

setInterval(doFakeTweeting, 700);