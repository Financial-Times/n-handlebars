/* eslint no-console: 0 */
'use strict';

const dateFormat = require('dateformat');

module.exports = function (format, options) {
	try {
		if (typeof format !== 'string') {
			options = format;
			format = 'isoUtcDateTime';
		}
		if (format === 'isoDateTime' || format === 'isoUtcDateTime') {
			format = 'isoUtcDateTime';
			return dateFormat(options.fn(this), format, true);
		}
		return dateFormat(options.fn(this), format);
	} catch(err) {
		console.log(err);
		return '';
	}
};
