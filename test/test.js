var test = require('tap').test
var jsStringEscape = require('../')

test('basic use', function (t) {
  t.equal(jsStringEscape('"Hello World!"'), '\\"Hello World!\\"')
  t.end()
})

test('invariants', function (t) {
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

test('supports arbitrary objects', function (t) {
  t.equal(jsStringEscape(null), 'null')
  t.equal(jsStringEscape(undefined), 'undefined')
  t.equal(jsStringEscape(false), 'false')
  t.equal(jsStringEscape(0.0), '0')
  t.equal(jsStringEscape({}), '[object Object]')
  t.equal(jsStringEscape(''), '')
  t.end()
})
