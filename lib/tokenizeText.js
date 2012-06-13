var natural = require('natural');
var processTokens = require('./processTokens');

var tokenizer = new natural.RegexpTokenizer({pattern: /[ \n\r\t\-\s]+/});

/**
 * Tokenizes the given text into normalized uppercased tokens
 *
 * @param String text Text you want to parse and tokenize
 * @param Function callback Callback gets called with this parameters function(error, String[])
 * @api public
 */
function tokenizeText(text, callback) {
    "use strict";
    processTokens(tokenizer.tokenize(text) || [], function (error, tokens) {
        process.nextTick(function () {
            callback(error, tokens);
        });
    });
}

module.exports = tokenizeText;