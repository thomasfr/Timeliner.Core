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
 *
 * @param String word
 * @param Function callback function(error, String[])
 * @api public
 */
function tokenizeWord(word, callback) {
    "use strict";
    var match, parts = [], stemmedPart, singularPart, singularMetaphones, stemmedMetaphones, token;

    // TODO: Improve that. Should be in the stemmer actually
    //if (-1 === (match = word.match(/^([#"',;:!?(.\[{])*([a-z0-9]+)+([,;:!?)\]}"'.])*$/i))) {
    //    return callback(null, []);
    //}
    //if (!match) {
    //    return callback(null, []);
    //}
    //word = match[2] || "";

    word = word || "";
    if (-1 === word.search(/^[a-z]*$/i) || word.length < 3) {
        return callback(null, []);
    }

    token = word.toUpperCase().trim();

    // TODO: Decide which stopwords to use depending on the given language
    var stopwordsEn = stopwords.en;

    // we skip stopwords
    if (stopwordsEn.indexOf(token) >= 0) {
        return callback(null, []);
    }

    parts.push(token);

    // TODO: Decide which stemmer to use depending on the given language
    stemmedPart = stemmer.stem(token) || "";

    if (stemmedPart.length > 2) {
        // calc double metaphone of the stemmed word
        stemmedMetaphones = doubleMetaphone.process(stemmedPart);
        //console.log("stemmed Metaphones for " + token + " " + stemmedMetaphones);
        if (stemmedMetaphones[0].length > 1) {
            parts.push((stemmedMetaphones[0] || "").trim());
        }
        if (stemmedMetaphones[1].length > 1) {
            parts.push((stemmedMetaphones[1] || "").trim());
        }
    }
    // the last element is the original uppercased stemmed token
    parts.push(stemmedPart.toUpperCase().trim());

    // Singularize word
    singularPart = nounInflector.singularize(token) || "";
    if (singularPart.length > 2) {
        // calc double metaphone of singular
        singularMetaphones = doubleMetaphone.process(singularPart);
        //console.log("singular Metaphones for " + token + " " + stemmedMetaphones);
        if (singularMetaphones[0].length > 1) {
            parts.push((singularMetaphones[0] || "").trim());
        }
        if (singularMetaphones[1].length > 1) {
            parts.push((singularMetaphones[1] || "").trim());
        }
    }
    parts.push(singularPart.toUpperCase().trim());

    parts.sort();
    parts = underscore.uniq(parts, true);

    process.nextTick(function () {
        callback(null, parts);
    });
}

module.exports = tokenizeWord;