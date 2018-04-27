'use strict';

module.exports = function (obj) {
	if (process.env.NODE_ENV !== 'development' && Object(obj) === obj && obj.hasOwnProperty('_locals')) {
		throw Error('For security reasons you may not use the Handlebars JSON helper to output the entire view context');
	}

	return JSON.stringify(obj);
};
