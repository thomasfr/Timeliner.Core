var sampleTexts = require('./lib/samples.js');
var index = require('./lib/index.js');

var document = {
    id:"sample1",
    text:sampleTexts.sample1
}


index(document, function (err, tokens) {
    console.log(tokens);
});