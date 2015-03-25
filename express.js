/*jshint node:true*/
"use strict";

require('es6-promise').polyfill();

var expressHandlebars = require('express-handlebars');
var handlebars = require('./handlebars');
var extendHelpers = require('./src/extend-helpers');

module.exports = function(app, options) {
	options = options || {};

	var configuredHandlebars = handlebars({
		helpers: options.helpers
	});

	var helpers = extendHelpers(options.helpers);

	var expressHandlebarsInstance = new expressHandlebars.ExpressHandlebars({
		// use a handlebars instance we have direct access to so we can expose partials
		handlebars: configuredHandlebars,
		extname: '.html',
		helpers: helpers,
		defaultLayout: options.defaultLayout || false,
		layoutsDir: options.layoutsDir || undefined,
		partialsDir: [
			options.directory + '/bower_components'
		].concat(options.partialsDir || [])
	});

	// makes the usePartial helper possible
	var exposePartials = expressHandlebarsInstance.getPartials().then(function(partials) {
		configuredHandlebars.partials = partials;
	});

	app.set('views', options.directory + (options.viewsDirectory || '/views'));

	app.engine('.html', expressHandlebarsInstance.engine);

	app.set('view engine', '.html');

	return exposePartials;
};

module.exports.handlebars = handlebars;