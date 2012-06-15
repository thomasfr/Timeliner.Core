var tokenizeWord = require('./tokenizeWord');
var underscore = require('underscore');
var async = require('async');

/**
 * Processes each word of the given tokens
 *
 * @param String[] tokens Array of Strings
 * @param Function callback Callback function with this signature: function(error, String[])
 * @private
 */
function processTokens(tokens, callback) {
    "use strict";
    var processFunctions = underscore.map(tokens, function (word) {
        return function (cb) {
            tokenizeWord(word, cb);
        };
    });
    async.parallel(
        processFunctions,
        function (error, results) {
            if (error) {
                callback(error, null);
            } else {
                var normalizedTokens = [];
                results.forEach(function (tokens) {
                    normalizedTokens = normalizedTokens.concat(tokens);
                });
                normalizedTokens.sort();
                normalizedTokens = underscore.uniq(normalizedTokens, true);
                callback(null, normalizedTokens);
            }
        }
    );
}

module.exports = processTokens;