# profanity-filter

[![Build Status](https://travis-ci.org/jwils0n/profanity-filter.png)](https://travis-ci.org/jwils0n/profanity-filter)

A static node.js utility for masking words or phrases in strings that aren't allowed.

## configuration

There are three methods of replacement, outlined below ('word' requires you specify a replacement for each word):

```javascript
stars   - That **** UX change was such a pain in the ***
grawlix - That &!%$ UX change was such a pain in the #@%
word    - That darn UX change was such a pain in the badonkadonk
```

Note: 'stars' is the default method of replacement

## methods

### filter.clean(string)

Takes supplied string and runs the filter based on the current dictionary of unallowed words and replacement method. Returns the filtered string.

```javascript
var filter = require('filter');
console.log(filter.clean('String I\'d like to filter for inappropriate words.'));
```

### filter.seed(name)

Populates the internal filter dictionary using a seed data JSON file (must live in lib/seeds).

```javascript
var filter = require('filter');
filter.seed('profanities');
```

###filter.debug()

Returns the dictionary, replacementMethod, and grawlixChars internal properties for debugging purposes.

```javascript
var filter = require('filter');
filter.debug()
```

### filter.setReplacementMethod(string)

Globally sets the method of replacement. Accepts 'stars', 'word', and 'grawlix'.

```javascript
var filter = require('filter');
filter.setReplacementMethod('grawlix');
```

### filter.setGrawlixChars(array)

Globally sets the grawlix characters to be used as replacements, if grawlix is the current replacementMethod.

```javascript
var filter = require('filter');
filter.setGrawlixChars(['1', '2', '3', '4', '5', '6']);
```

### filter.addWord(string, [string])

Adds a word to the internal replacement dictionary. The optional second parameter is used if the replacementMethod is set to 'word'. If the word method is set and no replacement is passed, the filter will default to 'BLEEP'.

```javascript
var filter = require('filter');
filter.addWord('ass', 'badonkadonk');
```

### filter.removeWord(string)

Removes a word from the internal replacement dicitonary.

```javascript
var filter = require('filter');
filter.removeWord('ass');
```