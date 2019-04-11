'use strict';

const path = require('path');
const Handlebars = require('handlebars');

module.exports = function presenter (presenterPath, context, options) {
	const presenterName = path.basename(presenterPath).replace(/-([a-z])/g, g => g[1].toUpperCase());
	let Presenter;
	if (presenterPath.startsWith('.')) {
		Presenter = require(path.join(process.cwd(), presenterPath));
	} else {
		Presenter = require(path.join(process.cwd(), 'bower_components', presenterPath));
	}
	if (options.data) {
		if (options.hash) Object.assign(context, options.hash);
		const data = Handlebars.createFrame(options.data);
		data[presenterName] = new Presenter(context);
		return options.fn(context, {data});
	}
};
