'use strict';

module.exports = function paragraphs (input, options) {

	const text = input instanceof Array ? input.join('') : input;
	const paras = text.split('</p>');
	const start = options.hash.start || 0;
	const end = options.hash.end || paras.length;

	return paras.slice(start, end).filter(function (p) {
		return p.length > 0;
	}).concat(['']).join('</p>');
};
