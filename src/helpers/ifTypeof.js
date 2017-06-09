'use strict';

module.exports = function (object, type, options) {
	if (typeof object === type) {
		return options.fn(this);
	}
	return options.inverse(this);
};
