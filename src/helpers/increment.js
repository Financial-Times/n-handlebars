'use strict';

module.exports = function (incrementBy, options) {
	return parseInt(options.fn(this)) + incrementBy;
};
