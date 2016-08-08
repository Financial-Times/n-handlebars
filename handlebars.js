/*jshint node:true*/
"use strict";

const Handlebars = require('handlebars');
const extendHelpers = require('./src/extend-helpers');

module.exports = function (options) {
	options = options || {};

	const helpers = extendHelpers(options.helpers);

	const handlebars = Handlebars;
	handlebars.registerHelper(helpers);

	return handlebars;
};
