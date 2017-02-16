/* eslint no-console: 0 */
/*jshint node:true*/
'use strict';

const express = require('express');
const handlebars = require('../../../express.js');
const yell = require('./src/yell');
const viewData = require('../view-data');
const app = module.exports = express();

const handlebarsPromise = handlebars(app, {
	partialsDir: [
		__dirname + '/views/partials'
	],
	helpers: {yell: yell},
	directory: __dirname
});

app.get('/templated', function (req, res) {
	res.render('main', viewData);
});

const actualAppListen = app.listen;

app.listen = function () {
	const args = arguments;

	return handlebarsPromise.then(function () {
		actualAppListen.apply(app, args);
	});
};

app.promise = handlebarsPromise.then(function () {
	console.log('This then is attached later than the internal then attached by n-handlebars')
});
