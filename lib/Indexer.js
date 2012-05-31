var index = require('./index');
var Configuration = require('./Configuration');
var util = require('util');
var events = require('events');

var Indexer = function Indexer(config) {
    "use strict";
    events.EventEmitter.call(this);
    this.configuration = new Configuration();
    this.configuration.setAll(config || {});
};
util.inherits(Indexer, events.EventEmitter);

var IndexerProto = Indexer.prototype;
IndexerProto.index = function (document, callback) {
    "use strict";
    if (this.configuration.has('indexRedisClient')) {
        return index.apply(this, [document, this.configuration.get('indexRedisClient'), callback]);
    }
    else {
        throw new Error("No 'indexRedisClient' config option defined.");
    }
};
module.exports = Indexer;