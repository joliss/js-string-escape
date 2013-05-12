var test = require('tap').test
var jsStringEscape = require('../')

test('jsStringEscape invariants', function (t) {
  var allCharacters = ''
  for (var i = 0; i < 65536; i++) {
    allCharacters += String.fromCharCode(i)
  }

  t.equal(eval("'" + jsStringEscape(allCharacters) + "'"), allCharacters)
  t.equal(eval('"' + jsStringEscape(allCharacters) + '"'), allCharacters)
  t.end()
})
