/*global it, describe, beforeEach, before*/
"use strict";

var request = require('supertest');
var app = require('./fixtures/app/main');

describe('express handlebars setup', function() {
	before(function() {
		return app.promise;
	});

	it('should do templating', function(done) {
		request(app)
			.get('/templated')
			.expect(200, /FT/, done);
	});

	it('should not inherit any markup by default', function(done) {
		request(app)
			.get('/templated')
			.expect(200, /^<h1>FT - on/, done);
	});

	it('should integrate with the image service', function(done) {
		request(app)
			.get('/templated')
			.expect(200, /\/\/www.ft.com\/__origami\/service\/image\/v2\/images\/raw\//, done);
	});

	it('should support loading partials via bower', function(done) {
		request(app)
			.get('/templated')
			.expect(200, /End of dep 2 partial/, done);
	});

	it('should support app-specific helpers', function(done) {
		request(app)
			.get('/templated')
			.expect(200, /HELLO/, done);
	});

	it('should provide inheritance helpers', function(done) {
		request(app)
			.get('/templated')
			.expect(200, /block1default block2override/, done);
	});

	it('should treat undefined flags as offy (like falsey)', function(done) {
		request(app)
			.get('/templated')
			// Currently fails - suggest we just ditch this feature, as per
			// https://github.com/Financial-Times/next-feature-flags-client/issues/26
			//.expect(/<undefinedflag-off>Should appear<\/undefinedflag-off>/)
			.expect(200, /<undefinedflag-on><\/undefinedflag-on>/, done);
	});

	describe('iteration helpers', function () {
		it('should provide an slice helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /slice\:34\:end/, done);
		});
	});

	describe('logic helpers', function () {
		it('should provide an if equals helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /ifEquals\:first not second/, done);
		});

		it('should provide an unless equals helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /unlessEquals\:not first second/, done);
		});

		it('should provide an if all helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /ifAll\:first not second/, done);
		});

		it('should provide an if some helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /ifSome\:first not second/, done);
		});

		it('should provide an if bool helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /ifBool\:first not second/, done);
		});
	});

	describe('content helpers', function () {

		it('should provide a nice paragraphs helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /Start Paragraphs<p>Paragraph 2<\/p>End Paragraphs/, done);
		});

		it('should provide a nice image stripping helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /ImageEndImage/, done);
		});

		it('should provide a nice date helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /Full date: Friday, 1 August, 2014/, done);
		});

		it('should fallover if the datehelper gets an invalid date', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /Full date:\ /, done);
		});

		it('should provide a nice date helper that lets you easily output the date in an o-date compatible format', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /ISO date: 2014-08-01T00:00:00Z/, done);
		});

		it('should provide a uri encoding helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /http\:\/\/domain\.com\?q&#x3D;this%20\/%20that http%3A%2F%2Fdomain\.com%3Fq%3Dthis%20%2F%20that/, done);
		});

		it('should provide a string concatenation helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /Concat onetwothree/, done);
		});

		it('should provide an image resizing helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /\/\/www.ft.com\/__origami\/service\/image\/v2\/images\/raw\/http%3A%2F%2Fimage\.jpg\?width=200&source=next&fit=scale-down/, done);
		});

		it('should provide a json helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /\{&quot;prop&quot;:&quot;val&quot;\}/, done);
		});

		it('should provide a dynamic partials helper', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /dynamic-partial/, done)
				.expect(200, /dynamicroot-iamroot/, done);
		});

		it('should provide a helper for decoding html entities', function(done) {
			request(app)
				.get('/templated')
				.expect(200, /Start entities Something, something, something and something End Entities/, done);
		});

	});


});
