'use strict';

var replacementMethod = 'stars';
var grawlixChars = ['!','@','#','$','%','&','*'];
var wordList = {};

var replacement = {
	stars: function (key) {
		var keyReplacement = '', i, len;

		for (i = 0, len = key.length; i < len; i++) {
			keyReplacement += '*';
		}

		return keyReplacement;
	},
	word: function (key) {
		return wordList[key];
	},
	grawlix: function (key) {
		var keyReplacement = '',
			grawlixLen = grawlixChars.length,
			wordLen = key.length,
			rand,
			i;

		for (i = 0; i < wordLen; i++) {
			rand = Math.floor(Math.random() * grawlixLen);
			keyReplacement += grawlixChars[rand];
		}

		return keyReplacement;
	}
};

module.exports = {
	config: {
		setReplacementMethod: function (method) {
			if (typeof replacement[method] === 'undefined') {
				throw 'Replacement method "' + method + '" not valid.';
			}
			replacementMethod = method;
		},
		setGrawlixChars: function (chars) {
			grawlixChars = chars;
		},
		addWord: function (word, replacement) {
			wordList[word] = replacement || 'BLEEP';
		},
		removeWord: function (word) {
			if (wordList[word]) {
				delete wordList[word];
			}
		}
	},
	clean: function (string) {
		var key, keyReplacement;

		for (key in wordList) {
			if (string.indexOf(key) !== -1) {
				keyReplacement = replacement[replacementMethod](key);
				string = string.replace(key, keyReplacement);
			}
		}

		return string;
	}
};