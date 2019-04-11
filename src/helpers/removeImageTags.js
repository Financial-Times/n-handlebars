'use strict';

module.exports = function removeImageTags (options) {
	return options.fn(this).replace(/<img[^>]+>/g, '');
};
