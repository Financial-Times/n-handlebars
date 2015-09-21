/*jshint node:true*/
'use strict';

var port = process.env.PORT || 3000;
var express = require('express');
var handlebars = require('../../../express.js');
var app = module.exports = express();

var handlebarsPromise = handlebars(app, {
	partialsDir: [
		__dirname + '/views/partials'
	],
	directory: __dirname
});

app.get('/templated', function(req, res, next) {
	res.render('main');
});

var actualAppListen = app.listen;

app.listen = function() {
	var args = arguments;

	return handlebarsPromise.then(function() {
		actualAppListen.apply(app, args);
	});
};

app.promise = handlebarsPromise.then(function () {
	console.log('This then is attached later than the internal then attached by n-handlebars')
});

