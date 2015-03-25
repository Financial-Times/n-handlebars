/*jshint node:true*/
"use strict";

var Handlebars = require('handlebars');
var extendHelpers = require('./src/extend-helpers');

module.exports = function (options) {
	options = options || {};

	var helpers = extendHelpers(options.helpers);

	var handlebars = Handlebars;
	handlebars.registerHelper(helpers);

	return handlebars;
};
