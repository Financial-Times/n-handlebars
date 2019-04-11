'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function inline (opts) {
	if (!opts || !opts.hash || !opts.hash.file) {
		throw new Error('file option is mandatory');
	}
	const file = opts.hash.file;
	return fs.readFileSync(path.join(process.cwd(), 'bower_components', file), 'utf-8');
};
