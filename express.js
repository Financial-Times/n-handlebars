/*jshint node:true*/
"use strict";

require('es6-promise').polyfill();

var expressHandlebars = require('express-handlebars');
var Handlebars = require('./handlebars');

module.exports = function(app, options) {
	options = options || {};

	var handlebars = Handlebars(options.helpers);

	var expressHandlebarsInstance = new expressHandlebars.ExpressHandlebars({
		// use a handlebars instance we have direct access to so we can expose partials
		handlebars: handlebars,
		extname: '.html',
		// helpers: helpers,
		defaultLayout: false,
		layoutsDir: __dirname + '/layouts',
		partialsDir: [
			directory + '/bower_components'
		]
	});

	// makes the usePartial helper possible
	var exposePartials = expressHandlebarsInstance.getPartials().then(function(partials) {
		handlebars.partials = partials;
	});

	app.set('views', directory + '/views');

	app.engine('.html', expressHandlebarsInstance.engine);

	app.set('view engine', '.html');

	return exposePartials;
};
