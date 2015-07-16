'use strict';

// Decode HTML entities that don't fall under the usual unsafe list
// i.e. for decoding characters that aren't &,<,>,",',`
module.exports = function (str, opts) {
	//TODO: add encode mode
	var key;
	var decodeMap = {
		'&nbsp;': ' '
	};

	for (key in decodeMap) {
		if (decodeMap.hasOwnProperty(key)) {
			str = str.replace(new RegExp(key, 'g'), decodeMap[key]);
		}
	}
	return str;
};
