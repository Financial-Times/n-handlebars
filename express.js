'use strict';

const Path = require('path');
const expressHandlebars = require('express-handlebars');
const handlebars = require('./handlebars');
const extendHelpers = require('./src/extend-helpers');
const loadPartials = require('./src/load-partials');

const nextifyHandlebars = function (options) {
	if (!options || !options.directory) {
		throw 'n-handlebars requires an options object containing a directory property';
	}
	const configuredHandlebars = handlebars({
		helpers: options.helpers
	});

	const helpers = extendHelpers(options.helpers);

	const expressHandlebarsInstance = new expressHandlebars.create({ // eslint-disable-line
		// use a handlebars instance we have direct access to so we can expose partials
		handlebars: configuredHandlebars,
		extname: '.html',
		helpers: helpers,
		defaultLayout: options.defaultLayout || false,
		layoutsDir: options.layoutsDir || undefined
	});

	const partialsDir = (options.partialsDir || []);
	const dependencyRoot = Path.join(options.directory, '/bower_components/');
	const ignoreListInLinkedDeps = ['.git', 'node_modules', 'bower_components', 'demos'];
	const limitToComponents = (options.limitToComponents || '');

	// look up templates on our own to avoid scanning thousands of files
	return loadPartials(expressHandlebarsInstance, dependencyRoot, partialsDir, ignoreListInLinkedDeps, limitToComponents)
	.then(function (partials) {
		expressHandlebarsInstance.partialsDir = partials;

		// makes the usePartial helper possible
		return expressHandlebarsInstance.getPartials()
		.then(function (partials) {
			configuredHandlebars.partials = partials;

			return expressHandlebarsInstance;
		});
	});
};

const applyToExpress = function (app, options) {
	if (!app) {
		throw 'n-handlebars requires an instance of an express app';
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
