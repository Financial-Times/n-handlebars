/*jshint node:true*/
"use strict";

require('es6-promise').polyfill();

var expressHandlebars = require('express-handlebars');
var handlebars = require('./handlebars');
var extendHelpers = require('./src/extend-helpers');
var loadPartials = require('./src/load-partials');

var nextifyHandlebars = function (options) {
	if (!options || !options.directory) {
		throw 'next-handlebars requires an options object containing a directory property';
	}
	var configuredHandlebars = handlebars({
		helpers: options.helpers
	});

	var helpers = extendHelpers(options.helpers);

	var expressHandlebarsInstance = new expressHandlebars.create({
		// use a handlebars instance we have direct access to so we can expose partials
		handlebars: configuredHandlebars,
		extname: '.html',
		helpers: helpers,
		defaultLayout: options.defaultLayout || false,
		layoutsDir: options.layoutsDir || undefined
	});

	var partialsDir = (options.partialsDir || []);
	var dependencyRoot = options.directory + '/bower_components/';
	var ignoreListInLinkedDeps = ['.git', 'node_modules', 'bower_components', 'demos'];

	// look up templates on our own to avoid scanning thousands of files
	return loadPartials(expressHandlebarsInstance, dependencyRoot, partialsDir, ignoreListInLinkedDeps)
	.then(function(partials) {
		expressHandlebarsInstance.partialsDir = partials;

		// makes the usePartial helper possible
		return expressHandlebarsInstance.getPartials()
		.then(function(partials) {
			configuredHandlebars.partials = partials;

			return expressHandlebarsInstance;
		});
	});
};

var applyToExpress = function (app, options) {
	if (!app) {
		throw 'next-handlebars requires an instance of an express app';
	}

	return nextifyHandlebars(options)
		.then(function (expressHandlebarsInstance) {
			app.set('views', options.directory + (options.viewsDirectory || '/views'));

			app.engine('.html', expressHandlebarsInstance.engine);

			app.set('view engine', '.html');

			return expressHandlebarsInstance;
		});
};

module.exports = applyToExpress;
module.exports.handlebars = handlebars;
module.exports.standalone = nextifyHandlebars;
