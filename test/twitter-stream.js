var https = require('https');
var _ = require('underscore');
var konsole = new (require('konsole'))('stream');
var sendDocument = require('../lib/sendDocument');

var redis = require('redis');
var clientDb1 = redis.createClient();
clientDb1.select(1);

var pattern = "css,javascript,node.js,rdf,sparql,redis,skos,linkeddata,semweb,semantic web,chromium,firefox,IE6,IE7,IE8,IE9,IE10";

var options = require('../conf/twitter.json');
var logLevels = ['info', 'warn', 'error'];

function konsoleListener(level, args) {
    var self = this, date = new Date();
    if (logLevels.indexOf(level) <= 0) {
        this.write(" " + this.label + " " + this.processType + ":" + this.pid + " " + level.toUpperCase() + " " +
            "+" + this.diff + "ms " +
            date + ": " +
            this.format.apply(this, args) + "'");
    }
}

konsole.on('message', konsoleListener);
konsole.on('error', function () {
    "use strict";
    console.log("ERROR ", arguments);
});

var sentTweets = 0;

var req = https.request(options);
req.on('response', function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        var rawTweet;
        try {
            rawTweet = JSON.parse(chunk);
            if (rawTweet) {
                konsole.info("#" + (++sentTweets) + ": new tweet matching pattern: '" + pattern + "'");
								sendDocument(rawTweet);
                rawTweet.user = JSON.stringify(rawTweet.user) || null;
                rawTweet.entities = JSON.stringify(rawTweet.entities) || null;
                rawTweet.place = JSON.stringify(rawTweet.place) || null;
								clientDb1.hmset('T:' + rawTweet.id, rawTweet);
            }
        } catch (error) {
            //console.trace();
            //konsole.warn(error);
        }
        rawTweet = null;
    });
});

req.on('error', function (e) {
    //console.trace();
    //konsole.warn(e);
});

req.setTimeout(0);
//req.setSocketKeepAlive(true);
req.write('track=' + pattern + '\n', 'utf8');
req.end();
