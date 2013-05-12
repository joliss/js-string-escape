var test = require('tap').test
var jsStringEscape = require('../')

test('jsStringEscape invariants', function (t) {
  var allCharacters = ''
  // JavaScript only supports the BMP (16-bit code points), so that's all we
  // need to test. http://stackoverflow.com/questions/3744721
  for (var i = 0; i < 65536; i++) {
    allCharacters += String.fromCharCode(i)
  }

  // Do not use .equal; mega-diffs in the output are not helpful.
  t.ok(eval("'" + jsStringEscape(allCharacters) + "'") === allCharacters)
  t.ok(eval('"' + jsStringEscape(allCharacters) + '"') === allCharacters)
  t.end()
})
