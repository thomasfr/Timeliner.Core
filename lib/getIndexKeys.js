/**
 * Returns keys used in redis for each token
 * @param normalizedTokens String[]
 * @param callback Function function(error, String[])
 */
function getIndexKeysForTokens(normalizedTokens, callback) {
    "use strict";
    var keys = [];
    normalizedTokens.forEach(function (part) {
        keys.push('W:' + part);
    });
    callback(null, keys);
}
module.exports = getIndexKeysForTokens;