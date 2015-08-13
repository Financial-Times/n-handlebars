/*global it, describe*/
"use strict";

var request = require('supertest');
var sinon = require('sinon');
var handlebars = require('../express');
var expect = require('chai').expect;
var yell = require('./fixtures/app/src/yell')

describe('standalone', function () {
	it('should render a template as a standalone instance', function (done) {

		handlebars.standalone({
			partialsDir: [
				__dirname + '/fixtures/app/views/partials'
			],
			helpers: {yell: yell},
			directory: __dirname + '/fixtures/app/'
		})
			.then(function (instance) {
				return instance.render(__dirname + '/fixtures/app/views/main.html', require('./fixtures/view-data'))
					.then(function (html) {
						expect(html).to.match(/<h1>FT[\s\S]*first not second[\s\S]*dynamic-partial[\s\S]*dynamicroot-iamroot/);
						done();
					})
			})
			.catch(console.log.bind(console))
	})
});
