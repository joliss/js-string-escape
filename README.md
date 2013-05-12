Escape any string to be a valid JavaScript string between double quotes or
single quotes.

If you need to generate JavaScript output, this library will help you safely
put arbitrary data in JavaScript strings:

```js
jsStringEscape = require('js-string-escape')

console.log('"' + jsStringEscape('Quotes (\", \'), newlines (\n), etc.') + '"')
// => "Quotes (\", \'), newlines (\n), etc."
```

In other words, given any string `s`, the following invariants hold:

```js
eval('"' + jsStringEscape(s) + '"') === s
eval("'" + jsStringEscape(s) + "'") === s
```

These `eval` expressions are safe with untrusted data `s`.

This library has been checked against [ECMAScript
5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4) and tested
against all 65536 Unicode code points.

Note that the returned string is not necessarily valid JSON, since JSON
disallows Unicode control characters.
