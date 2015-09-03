/*global it, describe, beforeEach, before*/
"use strict";

var request = require('supertest');
var app = require('./fixtures/no-bower-app/main');
var sinon = require('sinon');
var Handlebars = require('../express');
var expect = require('chai').expect;

describe('express handlebars setup', function() {
	before(function() {
		return app.promise;
	});

	it('should do templating', function(done) {
		request(app)
			.get('/templated')
			.expect(200, /FT/, done);
	});

});
