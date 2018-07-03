const { expect } = require('chai');
const buildLink = require('../src/helpers/buildLink');

describe('Build Link Helper', () => {

	const url = 'https://ft.com/somePath';
	const queryParams = {
		cpccampaign: 'test',
		something: 'else'
	};

	it('should correctly generate links', () => {
		expect(buildLink(url, queryParams)).to.equal('https://ft.com/somePath?cpccampaign=test&something=else');
	});

	it('should return an empty string if no URL specified', () => {
		expect(buildLink()).to.equal('');
	});

	it('should not break if no query params are passed', () => {
		expect(buildLink(url)).to.equal(url);
	});

	it('should not duplicate query params', () => {
		const urlWithParam = `${url}?something=new`;
		expect(buildLink(urlWithParam, queryParams)).to.equal('https://ft.com/somePath?something=else&cpccampaign=test');
	});
});
