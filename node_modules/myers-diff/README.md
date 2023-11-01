# myers-diff

A JavaScript test differentiation implementation based on [An O(ND) Difference Algorithm and Its Variations (1986)](www.xmailserver.org/diff2.pdf).  It is a lightweight, low-level, no-frills library that can be used to build bulkier viewers.

## Installation

```bash
$ npm install myers-diff
```

## Getting started

With basic usage:

```js
const myers = require('myers-diff');

const lhs = 'the quick red fox jumped\nover the hairy dog';
const rhs = 'the quick brown fox jumped\nover the lazy dog';

const diff = myers.diff(lhs, rhs);

console.log(myers.formats.GnuNormalFormat(diff));
console.log(diff);
//
// 1,2c1,2
// < the quick red fox jumped
// < over the hairy dog
// ---
// > the quick brown fox jumped
// > over the lazy dog
```

With all options:

```js
const myers = require('myers-diff');

const lhs = 'the quick red fox jumped\nover the hairy dog';
const rhs = 'the quick brown fox jumped\nover the lazy dog';

const diff = myers.diff(lhs, rhs, {
    compare: 'lines',
    ignoreWhitespace: false,
    ignoreCase: false,
    ignoreAccents: false
});
```

For building visual editors:

```js
const { diff, changed } = require('myers-diff');
const lhs = 'the quick red fox jumped\nover the hairy dog';
const rhs = 'the quick brown fox jumped\nover the lazy dog';
const changes = diff(lhs, rhs);

for (const change of changes) {
    if (changed(change.lhs)) {
        // deleted
        const { pos, text, del, length } = change.lhs;
    }
    if (changed(change.rhs)) {
        // added
        const { pos, text, add, length } = change.rhs;
    }
}
```

## API

- `myers`
  - [`myers.diff(lhs, rhs, [options])`](#diff)
  - [`myers.formats`](#formats)
    - [`GnuNormalFormat`](#formats-gnunormalformat)
  - [`myers.changed(part)`](#changed)
- Types
  - [`Change`](#change)
  - [`LeftPart`](#leftpart)
  - [`RightPart`](#rightpart)

<a name="diff"></a>

### myers.diff(lhs, rhs, [options])

Compare `lhs` text to `rhs` text.  Changes are compared from left to right such that items are deleted from left or added to right.

- `lhs` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) - The left-hand side text to compare.
- `rhs` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) - The right-hand side text to compare.
- `options` [`<object>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - Diff options.
  - `ignoreWhitespace` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type") - Ignores whitespace characters.
  - `ignoreCase` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type") - Ignores whitespace characters.
  - `ignoreAccents` [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type") - Ignores accent characters.
- Returns: `<`[`Change`](#change)`[]>` - Returns an array of [Change](#change).

<a name="change"></a>

### Change

An object that describes a change occurrence between the  left-hand text and right-hand text.

- `lhs` [`<LeftPart>`](#leftpart)- Describes the left-hand change.
- `rhs` [`<RightPart>`](#rightpart) - Describes the right-hand change.

<a name="leftpart"></a>

### LeftPart

Describes a left-hand change occurrence.

- `at` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The part item identifier.  When comparing lines, it is the _n-th_ line; when comparing words, it is the _n-th_ word; when comparing chars, it is the _n-th_ char.
- `del` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The number of parts deleted from the left. When comparing lines, it is the number of lines deleted; when comparing words, it is the number of words deleted; when comparing chars, it is the number of chars deleted.
- `pos` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The zero-based character position of the part from the original text.
- `text` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) - The text that was changed.
- `length` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The number of characters.

<a name="rightpart"></a>

### RightPart

Describes a right-hand change occurrence.

- `at` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The part item identifier.  When comparing lines, it is the _n-th_ line; when comparing words, it is the _n-th_ word; when comparing chars, it is the _n-th_ char.
- `add` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The number of parts added from the right. When comparing lines, it is the number of lines added; when comparing words, it is the number of words added; when comparing chars, it is the number of chars added.
- `pos` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The zero-based character position of the part from the original text.
- `text` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) - The text that was changed.
- `length` [`<number>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The number of characters.

<a name="formats"></a>

### myers.formats

Formatting functions.

#### GnuNormalFormat(changes)

Formats an array of [Change](#change) in [GNU Normal Format](https://www.gnu.org/software/diffutils/manual/html_node/Example-Normal.html#Example-Normal).

- `changes` `<`[`Change`](#change)`[]>` - An array of changes from [myers.diff](#diff).
- Returns [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The diff text.

<a name="changed"></a>

### myers.changed(part)

Examines the [`LeftPart`](#leftpart) or [`RightPart`](#rightpart) `part` to determine if was changed.  It is possible for a [Change](#change) to only affect one side or the other, or both.  If changed, it returns `true`, otherwise, it returns `false`.

- `part` `<`[`LeftPart`](#leftpart) | [`RightPart`](#rightpart)`>`- The left-hand part or right-hand part to compare.
- Returns: [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type") Returns `true` if changed, otherwise, it returns `false`.
