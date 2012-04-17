var util = require('util');
var search = require('./lib/search');

var query = "comparing";

search(query, function(error, replies) {
   if(error) return console.error(error);
    else console.log("TESTSEARCH", util.inspect(replies, false, 4, true));
});


