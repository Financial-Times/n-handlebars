const { URL } = require('url');

module.exports = function (url, queryParams = {}) {
	if (!url) return '';
	const urlObject = new URL(url);
	Object.keys(queryParams).forEach(key => {
		urlObject.searchParams.set(key, queryParams[key]);
	});
	return urlObject.href;
};
