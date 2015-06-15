'use strict';

module.exports = function(width, options) {
	return 'https://next-geebee.ft.com/image/v1/images/raw/' + encodeURIComponent(options.fn(this)) + '?width=' + width + '&amp;source=next&amp;fit=scale-down';
};
