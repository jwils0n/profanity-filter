'use strict';

var assert = require('assert');
var filter = require('../lib/filter.js');

var fixtures = {
	string: 'That damn UX change was such a pain in the ass.',
	seed: {
		'damn': 'dad-gum',
		'ass': 'badonkadonk'
	}
};

describe('clean', function () {

	filter.config.addWord('damn', 'dad-gum');
	filter.config.addWord('ass', 'badonkadonk');

	it('should replace the unallowed words', function () {
		var filteredString = filter.clean(fixtures.string);

		assert.equal(filteredString.indexOf('damn'), -1);
		assert.equal(filteredString.indexOf('ass'), -1);
	});

	it('should replace the correct number of characters for grawlix/stars methods', function () {
		filter.config.setReplacementMethod('stars');
		assert.equal(filter.clean(fixtures.string).length, fixtures.string.length);

		filter.config.setReplacementMethod('grawlix');
		assert.equal(filter.clean(fixtures.string).length, fixtures.string.length);
	});

	it('should replace the unallowed words with the replacement for "word" method', function () {
		filter.config.setReplacementMethod('word');

		var filteredString = filter.clean(fixtures.string);

		assert.notEqual(filteredString.indexOf('dad-gum'), -1);
		assert.notEqual(filteredString.indexOf('badonkadonk'), -1);
	});
});

describe('config', function () {

	beforeEach(function () {
		filter.config.removeWord('damn');
		filter.config.removeWord('ass');
		filter.config.setReplacementMethod('stars');
		filter.config.setGrawlixChars(['!','@','#','$','%','&','*']);
	});

	it('should be able to add words to the unallowed list', function () {
		assert.notEqual(filter.clean(fixtures.string).indexOf('damn'), -1);

		filter.config.addWord('damn');

		assert.equal(filter.clean(fixtures.string).indexOf('damn'), -1);
	});

	it('should be able to remove words from the unallowed list', function () {
		filter.config.addWord('damn');
		assert.equal(filter.clean(fixtures.string).indexOf('damn'), -1);

		filter.config.removeWord('damn');
		assert.notEqual(filter.clean(fixtures.string).indexOf('damn'), -1);
	});

	it('should be able to change the replacement method', function () {
		var filteredStrings = {};

		filter.config.addWord('damn', 'dad-gum');

		filter.config.setReplacementMethod('stars');
		filteredStrings.stars = filter.clean(fixtures.string);

		filter.config.setReplacementMethod('grawlix');
		filteredStrings.grawlix = filter.clean(fixtures.string);

		filter.config.setReplacementMethod('word');
		filteredStrings.word = filter.clean(fixtures.string);

		assert.notEqual(filteredStrings.stars, filteredStrings.grawlix);
		assert.notEqual(filteredStrings.grawlix, filteredStrings.word);
		assert.notEqual(filteredStrings.word, filteredStrings.stars);
	});

	it('should be able to change the grawlix characters', function () {
		filter.config.addWord('damn');
		filter.config.setReplacementMethod('grawlix');

		assert.equal(filter.clean(fixtures.string).indexOf('++++'), -1);

		filter.config.setGrawlixChars(['+']);
		assert.notEqual(filter.clean(fixtures.string).indexOf('++++'), -1);
	});

});