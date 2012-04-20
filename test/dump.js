var redis = require('redis');
var clientDb1 = redis.createClient();
clientDb1.select(2);
var util = require('util');
var clientDb2 = redis.createClient();
clientDb2.select(1);


/**
 * This will dump alle matching keys from one redis DB to another
 */


clientDb1.keys('T:*', function (error, replies) {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    var count = 0;
    replies.forEach(function (reply) {
        clientDb1.hgetall(reply, function (error, dump) {
            try {
                var tweet = dump;
                tweet.id = count;
                tweet.user = JSON.stringify(tweet.user) || null;
                tweet.entities = JSON.stringify(tweet.entities) || null;
                tweet.place = JSON.stringify(tweet.place) || null;
                console.log("dumping #" + (++count));
                clientDb2.hmset("T:" + tweet.id, tweet, function (error) {
                    if (error) {
                        console.error(error);
                        process.exit(1);
                    }
                    console.log("Inserted #" + count);
                });
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });
});