'use strict';

module.exports = function(width, options) {
	return 'https://next-geebee.ft.com/image/v1/images/raw/' + encodeURIComponent(options.fn(this)) + '?width=' + width + '&source=next&fit=scale-down';
};
