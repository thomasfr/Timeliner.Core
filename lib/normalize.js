var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var doubleMetaphone = natural.DoubleMetaphone;
var stopwords = require('./stopwords.js').words;
var stemmer = natural.LancasterStemmer;
var _ = require('underscore');

/**
 * Stemmed Parts is an array with a length of 3
 * first two are the double metaphone values
 * the last one is the original uppercased token
 */
module.exports = function (text) {
    var tokens = tokenizer.tokenize(text);
    var normalizedTokens = [];
    var parts = [];
    var stemmedPart = [];

    tokens.forEach(function (token) {
        token = token.toUpperCase();
        // skip stopwords
        if (_.indexOf(stopwords, token) === -1) {
            // TODO: Decide which stemmer to use depending on the given language
            // stem words
            stemmedPart = stemmer.stem(token);
            // calc double metaphone of the stemmed word
            parts = doubleMetaphone.process(stemmedPart);
            // the last element is the original uppercased token
            parts.push(token);
            // push the token parts to the
            normalizedTokens.push(parts);
        }
    });
    return normalizedTokens;
}