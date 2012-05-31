var natural = require('natural');
var doubleMetaphone = natural.DoubleMetaphone;
var stopwords = require('./stopwords');
var stemmer = natural.LancasterStemmer;
var nounInflector = new natural.NounInflector();
var underscore = require('underscore');

/**
 * Processes a given word.
 * Will do stemming, singularizing and adds double metaphone of each.
 * also adds the stemmed and singularized and the word itself.
 * So at max there are 7 tokens generated for each word.
 * Tokens gets sorted and duplicates gets removed
 * @param word String
 * @param callback Function function(error, String[])
 */
function processWord(word, callback) {
    "use strict";
    var match, parts = [], stemmedPart, singular, singularMetaphones, stemmedMetaphones, token;

    try {
        // TODO: Improve that. Should be in the stemmer actually
        if (-1 === (match = word.match(/^([#"',;:!?(.\[{])*([a-z0-9]+)+([,;:!?)\]}"'.])*$/i))) {
            return callback(null, []);
        }
        if (!match) {
            return callback(null, []);
        }
        word = match[2] || "";
        if (word.length < 3) {
            return callback(null, []);
        }

        token = word.toUpperCase().trim();

        // TODO: Decide which stopwords to use depending on the given language
        var stopwordsEn = stopwords.en;

        // we skip stopwords
        if (stopwordsEn.indexOf(token) >= 0) {
            return callback(null, []);
        }

        // TODO: Decide which stemmer to use depending on the given language
        // stem words
        stemmedPart = stemmer.stem(token) || "";

        // calc double metaphone of the stemmed word
        stemmedMetaphones = doubleMetaphone.process(stemmedPart);
        parts.push((stemmedMetaphones[0] || "").trim());
        parts.push((stemmedMetaphones[1] || "").trim());

        // the last element is the original uppercased stemmed token
        parts.push(stemmedPart.toUpperCase().trim());

        // Singularize word
        singular = nounInflector.singularize(token) || "";

        // calc double metaphone of singular
        singularMetaphones = doubleMetaphone.process(singular);
        parts.push((singularMetaphones[0] || "").trim());
        parts.push((singularMetaphones[1] || "").trim());

        // Last Element is the original uppercased singular token
        parts.push(singular.toUpperCase().trim());

        // The very last Element is the original word
        parts.push(token);

        parts.sort();
        // Remove duplicates
        parts = underscore.uniq(parts, true);
        callback(null, parts);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = processWord;