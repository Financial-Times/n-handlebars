'use strict';

module.exports = function () {
	const args = [].slice.call(arguments);
	return args.slice(0, -1);
};
