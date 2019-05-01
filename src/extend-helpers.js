function deprecate(helper) {
	return function (...args) {
		if (process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line no-console
			console.warn(`The Handlebars helper ${helper.name} has been deprecated. Please talk to the Core UI team if you need to use it in your application templates. If you are not using this helper it may be used by a dependency, in which case you can ignore this warning.`);
		}

		return Reflect.apply(helper, this, args);
	}
}

module.exports = function (helpers) {
	helpers = helpers || {};

	helpers.paragraphs = deprecate(require('./helpers/paragraphs'));
	helpers.removeImageTags = deprecate(require('./helpers/removeImageTags'));
	helpers.ifEquals = require('./helpers/ifEquals');
	helpers.ifEqualsSome = deprecate(require('./helpers/ifEqualsSome'));
	helpers.ifAll = require('./helpers/ifAll');
	helpers.ifSome = require('./helpers/ifSome');
	helpers.ifBool = deprecate(require('./helpers/ifBool'));
	helpers.ifTypeof = deprecate(require('./helpers/ifTypeof'));
	helpers.unlessAll = require('./helpers/unlessAll');
	helpers.unlessEquals = require('./helpers/unlessEquals');
	helpers.dateformat = require('./helpers/dateformat');
	helpers.resize = require('./helpers/resize');
	helpers.encode = require('./helpers/encode');
	helpers.decodeHtmlEntities = deprecate(require('./helpers/decodeHtmlEntities'));
	helpers.defineBlock = require('./helpers/defineBlock');
	helpers.outputBlock = require('./helpers/outputBlock');
	helpers.slice = require('./helpers/slice');
	helpers.increment = deprecate(require('./helpers/increment'));
	helpers.json = require('./helpers/json');
	helpers.concat = require('./helpers/concat');
	helpers.usePartial = require('./helpers/usePartial');
	helpers.presenter = deprecate(require('./helpers/presenter'));
	helpers.debug = deprecate(require('./helpers/debug'));
	helpers.array = require('./helpers/array');
	helpers.inline = deprecate(require('./helpers/inline'));
	helpers.buildLink = deprecate(require('./helpers/buildLink'));
	helpers.nImagePresenter = require('@financial-times/n-image/src/handlebars-helpers/nImagePresenter');
	helpers.concept = require('@financial-times/n-topic-card/handlebars-helpers/concept');

	return helpers;
};
