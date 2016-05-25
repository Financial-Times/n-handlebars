'use strict';
var path = require('path');
var handlebars = require('handlebars');

module.exports = function(name, opts) {
	if(opts.hash.path){
		name = path.join(opts.hash.path, name);
	}
	
	return handlebars.partials[name] ? handlebars.partials[name](this, opts) : '';
};
