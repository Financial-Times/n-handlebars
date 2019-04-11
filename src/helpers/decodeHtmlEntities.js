'use strict';

// Decodes HTML entities that don't fall under the usual unsafe list
// i.e. for decoding characters that aren't &,<,>,",',`
module.exports = function decodeHtmlEntities (str) {
	let key;
	const decodeMap = {
		'&nbsp;': ' '
	};

	for (key in decodeMap) {
		if (decodeMap.hasOwnProperty(key)) {
			str = str.replace(new RegExp(key, 'g'), decodeMap[key]);
		}
	}
	return str;
};
