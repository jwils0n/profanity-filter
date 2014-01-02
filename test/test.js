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

	filter.addWord('damn', 'dad-gum');
	filter.addWord('ass', 'badonkadonk');

	it('should replace the unallowed words', function () {
		var filteredString = filter.clean(fixtures.string);

		assert.equal(filteredString.indexOf('damn'), -1);
		assert.equal(filteredString.indexOf('ass'), -1);
	});

	it('should replace the correct number of characters for grawlix/stars methods', function () {
		filter.setReplacementMethod('stars');
		assert.equal(filter.clean(fixtures.string).length, fixtures.string.length);

		filter.setReplacementMethod('grawlix');
		assert.equal(filter.clean(fixtures.string).length, fixtures.string.length);
	});

	it('should replace the unallowed words with the replacement for "word" method', function () {
		filter.setReplacementMethod('word');

		var filteredString = filter.clean(fixtures.string);

		assert.notEqual(filteredString.indexOf('dad-gum'), -1);
		assert.notEqual(filteredString.indexOf('badonkadonk'), -1);
	});
});

describe('config', function () {

	beforeEach(function () {
		filter.removeWord('damn');
		filter.removeWord('ass');
		filter.setReplacementMethod('stars');
		filter.setGrawlixChars(['!','@','#','$','%','&','*']);
	});

	it('should be able to add words to the unallowed list', function () {
		assert.notEqual(filter.clean(fixtures.string).indexOf('damn'), -1);

		filter.addWord('damn');

		assert.equal(filter.clean(fixtures.string).indexOf('damn'), -1);
	});

	it('should be able to remove words from the unallowed list', function () {
		filter.addWord('damn');
		assert.equal(filter.clean(fixtures.string).indexOf('damn'), -1);

		filter.removeWord('damn');
		assert.notEqual(filter.clean(fixtures.string).indexOf('damn'), -1);
	});

	it('should be able to change the replacement method', function () {
		var filteredStrings = {};

		filter.addWord('damn', 'dad-gum');

		filter.setReplacementMethod('stars');
		filteredStrings.stars = filter.clean(fixtures.string);

		filter.setReplacementMethod('grawlix');
		filteredStrings.grawlix = filter.clean(fixtures.string);

		filter.setReplacementMethod('word');
		filteredStrings.word = filter.clean(fixtures.string);

		assert.notEqual(filteredStrings.stars, filteredStrings.grawlix);
		assert.notEqual(filteredStrings.grawlix, filteredStrings.word);
		assert.notEqual(filteredStrings.word, filteredStrings.stars);
	});

	it('should be able to change the grawlix characters', function () {
		filter.addWord('damn');
		filter.setReplacementMethod('grawlix');

		assert.equal(filter.clean(fixtures.string).indexOf('++++'), -1);

		filter.setGrawlixChars(['+']);
		assert.notEqual(filter.clean(fixtures.string).indexOf('++++'), -1);
	});

});