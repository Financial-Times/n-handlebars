/*jshint node:true*/
"use strict";

var Handlebars = require('handlebars');

module.exports = function (options) {
	options = options || {};

	var helpers = options.helpers || {};

	helpers.paragraphs = require('./src/helpers/paragraphs');
	helpers.removeImageTags = require('./src/helpers/remove-image-tags');
	helpers.ifEquals = require('./src/helpers/if-equals');
	helpers.ifAll = require('./src/helpers/if-all');
	helpers.ifSome = require('./src/helpers/if-some');
	helpers.topicUrl = require('./src/helpers/topic-url');
	helpers.dateformat = require('./src/helpers/dateformat');
	helpers.resize = require('./src/helpers/resize');
	helpers.encode = require('./src/helpers/encode');
	helpers.hashedAsset = require('./src/helpers/hashed-asset');
	helpers.defineBlock = require('./src/helpers/define-block');
	helpers.outputBlock = require('./src/helpers/output-block');
	helpers.slice = require('./src/helpers/slice');
	helpers.json = require('./src/helpers/json');
	helpers.usePartial = require('./src/helpers/use-partial');
	helpers.flagStatuses = require('./src/helpers/flag-statuses');

	Handlebars.registerHelper(helpers);

	return Handlebars;
};
