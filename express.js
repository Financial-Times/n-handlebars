/*jshint node:true*/
"use strict";

require('es6-promise').polyfill();

var expressHandlebars = require('express-handlebars');
var handlebars = require('./handlebars');
var extendHelpers = require('./src/extend-helpers');

var fs = require('fs');
var Path = require('path');

var readdirAsync = function(path) {
	return new Promise(function(res, rej) {
		fs.readdir(path, function(err, files) {
			if(err) return rej(err);

			res(files);
		});
	});
};

var lstatAsync = function(path) {
	return new Promise(function(res, rej) {
		fs.lstat(path, function(err, stats) {
			if(err) return rej(err);

			res(stats);
		});
	});
};

var realpathAsync = function(path) {
	return new Promise(function(res, rej) {
		fs.realpath(path, function(err, path) {
			if(err) return rej(err);

			res(path);
		});
	});
};

var dependencyPartialsPaths = function(bower_components, ignores) {
	console.log("Scanning bower components in ", bower_components, "for partials");

	return readdirAsync(bower_components)
	.then(function(files) {
		var stats = files.map(function(path) {
			var fullPath = Path.join(bower_components, path);

			return lstatAsync(fullPath)
			.then(function(stat) {
				return [fullPath, stat.isSymbolicLink()];
			});
		});

		return Promise.all(stats)
		.then(function(stats) {
			var links = stats
				.filter(function(it) { return it[1]; })
				.map(function(it) { return it[0] });
			var directories = stats
				.filter(function(it) { return !it[1]; })
				.map(function(it) { return it[0] });

			console.log("Found components", directories);
			console.log("Found linked components", links);

			return Promise.all(links.map(function(link) {
				return realpathAsync(link)
				.then(function(realPath) {
					return readdirAsync(realPath)
					.then(function(items) {
						return Promise.all(items
						.filter(function(it) { return ignores.indexOf(it) < 0; })
						.map(function(it) { return Path.join(realPath, it); })
						.map(function(path) {
							return lstatAsync(path)
							.then(function(stat) { return [path, stat.isDirectory()]; });
						}))
					});
				})
			}))
			.then(function(paths) {
				return paths.reduce(function(acc, it) { return acc.concat(it); }, []);
			})
			.then(function(paths) {
				return paths
				.filter(function(it) { return it[1]; })
				.map(function(it) { return it[0]; })
			})
			.then(function(paths) {
				return directories.concat(paths);
			});
		});
	});
};

var nextifyHandlebars = function (options) {
	if (!options || !options.directory) {
		throw 'next-handlebars requires an options object containing a directory property';
	}
	var configuredHandlebars = handlebars({
		helpers: options.helpers
	});

	var helpers = extendHelpers(options.helpers);

	return dependencyPartialsPaths(options.directory + '/bower_components', ['.git', 'node_modules', 'bower_components'])
	.then(function(partials) {
		var partialsDir = (options.partialsDir || [])
			.concat(partials);

		console.log("Creating expressHandlebarsInstance with partialsDir", partialsDir);
		var expressHandlebarsInstance = new expressHandlebars.create({
			// use a handlebars instance we have direct access to so we can expose partials
			handlebars: configuredHandlebars,
			extname: '.html',
			helpers: helpers,
			defaultLayout: options.defaultLayout || false,
			layoutsDir: options.layoutsDir || undefined,
			partialsDir: partialsDir
		});

		// makes the usePartial helper possible
		return expressHandlebarsInstance.getPartials().then(function(partials) {
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
