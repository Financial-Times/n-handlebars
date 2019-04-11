'use strict';

module.exports = function ifEqualsSome () {

	const args = [].slice.call(arguments);
	const opts = args.pop();
	const value = args.shift();

	return args.some(function (arg) {
		return value === arg;
	}) ? opts.fn(this) : opts.inverse(this) ;
};
