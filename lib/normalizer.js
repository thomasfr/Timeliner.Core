var processWord = require('./processWord');
var _ = require('underscore');
var async = require('async');

/**
 * Normalizes the given Array of tokens
 * @param tokens String[]
 * @param callback Function function(error, String[])
 */
function normalizer(tokens, callback) {
    "use strict";
    var processFunctions = _.map(tokens, function (word) {
        return function (cb) {
            processWord(word, function (error, parts) {
                if (error) {
                    return cb(error, null);
                }
                cb(null, parts);
            });
        };
    });
    async.parallel(processFunctions, function (error, results) {
        if (error) {
            return callback(error, null);
        }
        var normalizedTokens = [];
        results.forEach(function (tokens) {
            normalizedTokens = normalizedTokens.concat(tokens);
        });
        normalizedTokens.sort();
        normalizedTokens = _.uniq(normalizedTokens, true);
        callback(null, normalizedTokens);
    });
}

module.exports = normalizer;