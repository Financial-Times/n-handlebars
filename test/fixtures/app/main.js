/*jshint node:true*/
'use strict';

var port = process.env.PORT || 3000;
var express = require('express');
var Handlebars = require('../../../express.js');
var yell = require('./src/yell');

var app = module.exports = express();

var handlebarsPromise = Handlebars(app, {
	partialsDir: [
		__dirname + '/views/partials'
	],
	helpers: {yell: yell},
	directory: __dirname
});

app.get('/templated', function(req, res, next) {
	res.render('main', {
		title: "FT",
		image: "https://avatars0.githubusercontent.com/u/3502508?v=3",
		date: new Date('Fri Aug 01 2014 00:00:00 GMT'),
		text : "<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>",
		entitiesText: "Something,&nbsp;something,&nbsp;something and something",
		block1default: 'block1default',
		block2default: 'block2default',
		block2override: 'block2override',
		thing1: 'thing1',
		thing2: 'thing2',
		thing3: 'thing3',
		items: [1,2,3,4,5],
		obj: {prop: 'val'},
		partial: 'partial',
		rootVar: 'iamroot'
	});
});

var actualAppListen = app.listen;

app.listen = function() {
	var args = arguments;

	return handlebarsPromise.then(function() {
		actualAppListen.apply(app, args);
	});
};
