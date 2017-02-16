'use strict';

module.exports = function (width, options) {
	return 'https://www.ft.com/__origami/service/image/v2/images/raw/' + encodeURIComponent(options.fn(this)) + '?width=' + width + '&source=next&fit=scale-down';
};
