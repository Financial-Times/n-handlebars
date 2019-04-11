'use strict';

// credit: http://blog.teamtreehouse.com/handlebars-js-part-3-tips-and-tricks

module.exports = function debug (optionalValue) {
	/* eslint no-console: 0 */
	console.log('Current Context');
	console.log('====================');
	console.log(this);
	if (optionalValue) {
		console.log('Value');
		console.log('====================');
		console.log(optionalValue);
	}
};
