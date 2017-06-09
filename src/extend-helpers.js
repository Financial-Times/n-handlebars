'use strict';

module.exports = function (helpers) {
	helpers = helpers || {};

	helpers.paragraphs = require('./helpers/paragraphs');
	helpers.removeImageTags = require('./helpers/removeImageTags');
	helpers.ifEquals = require('./helpers/ifEquals');
	helpers.ifAll = require('./helpers/ifAll');
	helpers.ifSome = require('./helpers/ifSome');
	helpers.ifBool = require('./helpers/ifBool');
	helpers.ifTypeof = require('./helpers/ifTypeof');
	helpers.unlessAll = require('./helpers/unlessAll');
	helpers.unlessEquals = require('./helpers/unlessEquals');
	helpers.dateformat = require('./helpers/dateformat');
	helpers.resize = require('./helpers/resize');
	helpers.encode = require('./helpers/encode');
	helpers.decodeHtmlEntities = require('./helpers/decodeHtmlEntities');
	helpers.defineBlock = require('./helpers/defineBlock');
	helpers.outputBlock = require('./helpers/outputBlock');
	helpers.slice = require('./helpers/slice');
	helpers.increment = require('./helpers/increment');
	helpers.json = require('./helpers/json');
	helpers.concat = require('./helpers/concat');
	helpers.usePartial = require('./helpers/usePartial');
	helpers.presenter = require('./helpers/presenter');
	helpers.debug = require('./helpers/debug');
	helpers.array = require('./helpers/array');
	helpers.nImagePresenter = require('@financial-times/n-image/dist/handlebars-helpers/nImagePresenter');
	helpers.concept = require('@financial-times/n-concept/handlebars-helpers/concept');

	return helpers;
};
