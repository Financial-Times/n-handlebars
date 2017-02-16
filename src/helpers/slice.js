'use strict';

module.exports = function (context, block) {
	let ret = '';
	if (!context || !Array.isArray(context)) {
		return ret;
	}
	const offset = parseInt(block.hash.offset) || 0;
	const limit = parseInt(block.hash.limit) || 5;
	let i = offset;
	const j = ((limit + offset) < context.length) ? (limit + offset) : context.length;

	for (i, j; i<j; i++) {
		ret += block.fn(context[i]);
	}

	return ret;
};
