const minifier = require('html-minifier').minify;

module.exports = function(isEnabled, options) {
	const minifierOpts = {
		removeComments: true,
		removeCommentsFromCDATA: true,
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeAttributeQuotes: true,
		removeRedundantAttributes: true,
		removeEmptyAttributes: true,
		removeOptionalTags: true,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true
	};
	// handle no params
	if (arguments.length !== 2) {
		options = isEnabled;
		isEnabled = false;
	}
	return isEnabled ? minifier(options.fn(this), minifierOpts) : options.fn(this);
};
