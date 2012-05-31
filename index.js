var Indexer = require('./lib/Indexer');
var search = require('./lib/search');

module.exports = {
    createIndexer: function (config) {
        "use strict";
        return new Indexer(config);
    }
};
