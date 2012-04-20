var natural = require('natural');
var async = require('async');

//var tokenizer = new natural.WordTokenizer();
var tokenizer = new natural.RegexpTokenizer({pattern: /[ \n\r\t\-\s]+/});

var normalizer = require('./normalizer');

/**
 *
 * @param text String
 * @param callback Function function(error, String[])
 */
function parseText(text, callback) {
    "use strict";
    // each function will be called in series
    // passing the values passed in the callbacks
    // to the next function
    // the last argument 'callback' gets all results passed
    async.waterfall([
        function (cb) {
            // first argument is reserved for errors.
            cb(null, tokenizer.tokenize(text) || []);
        },
        normalizer
    ], callback);
}

module.exports = parseText;