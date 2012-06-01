var parseText = require('./parseText');
var getIndexKeys = require('./getIndexKeys');
var fs = require('fs');

function index(document, client, callback) {
    "use strict";

    var text = document.text || null;
    var id = document.id || null;

    if (!text || !id) {
        return callback("invalid document", null);
    }

    parseText(text, function (error, keys) {
        // TODO: FInd a better way to get the lua command. Or wait for the new redis client with lua command functionality
        var indexScript = fs.readFileSync(__dirname + '/index.lua', 'utf8');
        client.eval(indexScript, 2, "id", "tokens", id, JSON.stringify(keys), function (err, val) {
            console.log("LENGTH", keys.length);
            console.log("REDIS RETURN", val);
            console.log("REDIS ERR", err);
        });
    });
}

module.exports = index;