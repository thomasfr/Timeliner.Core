var tokenizeText = require('../index.js').tokenizeText;
var dummyText = "This is an example text. It will create some strings, let`s say tokens. This Tokens are generated via stemming, singularizing and calculating phonetic strings for every word. This is done through the wonderful and excellent 'natural' module by chris umbel!";
tokenizeText(dummyText, function (error, tokens) {
    "use strict";
    console.log(tokens);
});