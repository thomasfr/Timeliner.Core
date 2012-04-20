var search = require('./lib/search');
var redis = require('redis');
var pubSubClient = redis.createClient();
var query = process.argv[2] || null;


if (!query) {
    console.error("No query defined");
    process.exit(1);
}

console.log("Searching for '" + query + "'");

search(query, function (error, documents, searchKey) {
    "use strict";
    if (error) {
        console.error(error);
        return false;
    } else {
        documents.forEach(function (document) {
            console.log(document.id + ": " + document.text);
            console.log();
        });
        var searchEvent = 'search:' + searchKey + ':new';
        console.log("\n\n");
        console.log("SUBSCRIBING TO ", searchEvent);
        console.log("\n\n\n");
        pubSubClient.subscribe(searchEvent);
        pubSubClient.on('message', function (channel, message) {
            var doc = JSON.parse(message);
            console.log(doc.id + ": " + doc.text);
            console.log();
        });
    }
});