'use strict';

module.exports = function increment (incrementBy, options) {
	return parseInt(options.fn(this)) + incrementBy;
};
