'use strict';
const path = require('path');
const handlebars = require('handlebars');

module.exports = function (name, opts) {
	if(opts.hash.path){
		name = path.join(opts.hash.path, name);
	}
	if (!handlebars.partials[name]) {
		throw new Error(`missing handlebars partial ${name}`);
	}
	return handlebars.partials[name](this, opts);
};
