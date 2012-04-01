var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var doubleMetaphone = natural.DoubleMetaphone;
var stopwords = require('./stopwords.js').words;
var stemmer = natural.LancasterStemmer;
var nounInflector = new natural.NounInflector();
var _ = require('underscore');
var util = require('util');

/**
 * Stemmed Parts is an array with a length of 3
 * first two are the double metaphone values
 * the last one is the original uppercased token
 */
module.exports = function (text) {
    var tokens = tokenizer.tokenize(text);
    var parts;
    var normalizedTokens = [];
    var stemmedPart = [];
    var singular;
    var singularMetaphones;

    tokens.forEach(function (word) {
        parts = [];
        var token = word.toUpperCase();
        // TODO: Decide which stopwords to use depending on the given language
        // skip stopwords
        if (_.indexOf(stopwords, token) === -1) {
            // TODO: Decide which stemmer to use depending on the given language
            // stem words
            stemmedPart = stemmer.stem(token);
            // calc double metaphone of the stemmed word
            var stemmedMetaphones = doubleMetaphone.process(stemmedPart);
            parts.push(stemmedMetaphones[0]);
            parts.push(stemmedMetaphones[1]);
            // the last element is the original uppercased token
            parts.push(stemmedPart.toUpperCase());

            singular = nounInflector.singularize(token);
            singularMetaphones = doubleMetaphone.process(singular);
            parts.push(singularMetaphones[0]);
            parts.push(singularMetaphones[1]);
            parts.push(singular.toUpperCase());

            parts.push(token);
            console.log(util.inspect(parts, false, 4, true));
            // push the token parts to the
            normalizedTokens.push(parts);
        }
    });
    return normalizedTokens;
}