'use strict';

module.exports = function () {

	const args = [].slice.call(arguments);
	const opts = args.pop();

	return args.some(function (arg) {
		return arg;
	}) ? opts.fn(this) : opts.inverse(this) ;
};
