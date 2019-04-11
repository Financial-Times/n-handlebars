'use strict';

const compiledExpressions = {};

function compile (expression) {
	if (!/^((\$\d)| |(&&)|(\|\|)|\)|\()+$/.test(expression)) {
		throw 'Unsafe expression passed to isBool helper';
	}

	if (expression.length > 20) {
		throw 'Unsafe expression passed to isBool helper (only short strings allowed because http://www.jsfuck.com/)';
	}
	return new Function('variables', `return !!(${expression.replace(/\$(\d)/g, ($0, $1) => `variables[${$1}]`)})`);
}

module.exports = function ifBool () {

	const variables = [].slice.call(arguments);
	const opts = variables.pop();
	const expression = variables.pop();
	const compiledExpression = compiledExpressions[expression] || (compiledExpressions[expression] = compile(expression));
	return compiledExpression(variables) ? opts.fn(this) : opts.inverse(this) ;
};
