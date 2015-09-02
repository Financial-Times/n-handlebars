"use strict";

var fs = require('fs');
var Path = require('path');
var denodeify = require('denodeify');

var readdirAsync = denodeify(fs.readdir);
var lstatAsync = denodeify(fs.lstat);
var realpathAsync = denodeify(fs.realpath);
var exists = denodeify(fs.exists, function(doesExists) { return [undefined, doesExists]; });

var flatten = function(list) {
	return list.reduce(function(acc, it) {
		return acc.concat(it);
	}, []);
};

var itemsWithStats = function(directory) {
	return exists(directory)
		.then(function(exists) {
			if (!exists) return [];
			return readdirAsync(directory)
				.then(function(files) {
					var stats = files.map(function(file) {
						var fullPath = Path.join(directory, file);

						return lstatAsync(fullPath)
						.then(function(stat) {
							return {name: file, path: fullPath, stat: stat};
						});
					});

					return Promise.all(stats);
				});
		});
};

var classifyItems = function(items, otherPaths) {
	return ({
		directories: items
			.filter(function(it) { return it.stat.isDirectory(); })
			.concat(otherPaths)
			.map(function(it) { return { name: it.path || it, path: it.path || it }; }),

	links: items
		.filter(function(it) { return it.stat.isSymbolicLink(); })
		.map(function(it) { return it.path })
	});
};

var selectValidLinkedPaths = function(linkedItems, ignores, linkPath) {
	return linkedItems
		.filter(function(item) { return ignores.indexOf(item.name) < 0 && item.stat.isDirectory(); })
		.map(function(item) { return { name: Path.join(linkPath, item.name), path: item.path }; });
};

var itemNamespace = function(name, bowerRoot) {
	var namespace = name.replace(bowerRoot, '');
	if(namespace === name)
		return '';

	return namespace;
};

// exports

var loadPartials = function(ehInstance, bowerRoot, otherPaths, ignores) {
	// Get files in bowerRoot
	return itemsWithStats(bowerRoot)
	.then(function(items) {
		items = classifyItems(items, otherPaths);

		return Promise.all(items.links
			.map(function(link) {
				return realpathAsync(link)
				.then(function(linkedPath) {
					return itemsWithStats(linkedPath);
				})
				.then(function(it) {
					return selectValidLinkedPaths(it, ignores, link);
				});
			})
		)
		.then(function(paths) {
			return items.directories.concat(flatten(paths));
		});
	})
	.then(function(directories) {
		return Promise.all(directories.map(function(dir) {
			var namespace = itemNamespace(dir.name, bowerRoot);

			return ehInstance.getTemplates(dir.path)
			.then(function(templates) {
				return ({
					templates: templates,
					namespace: namespace
				});
			});
		}));
	});
};

module.exports = loadPartials;
