var Configuration = require('./Configuration');
var configuration = new Configuration();
var underscore = require('underscore');

var configure = function configure(config) {
    "use strict";
    config = config || {};
    underscore.each(config, function (value, key) {
        configuration.set(key, value);
    });
};

module.exports = configure;