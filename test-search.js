var util = require('util');
var search = require('./lib/search');
var query = "detail";

search(query, function(error, replies) {
   if(error) return console.error(error);
    else console.log(util.inspect(replies, false, 4, true));
});


