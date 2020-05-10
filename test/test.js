/* eslint-disable no-eval */
import {test} from 'tap';
import jsStringEscape from '../src/index.js';

// Require the local copy of Punycode.js, as we don't want to use the outdated
// version that shipped with Node v0.8:
import punycode from 'punycode/punycode.js';

test('basic use', function (t) {
    t.equal(jsStringEscape('"Hello World!"'), '\\"Hello World!\\"');
    t.end();
});

test('invariants', function (t) {
    let allCharacters = '';
    // The Punycode.js version that ships with Node v0.8 won't create unmatched
    // surrogate halves, so let's use `String.fromCharCode` for BMP code points.
    for (let i = 0; i <= 0x00FFFF; i++) {
        allCharacters += String.fromCharCode(i);
    }
    // Generate strings based on astral code points. Trickier than it seems:
    // http://mathiasbynens.be/notes/javascript-encoding
    for (let i = 0x010000; i <= 0x10FFFF; i++) {
        allCharacters += punycode.ucs2.encode([i]);
    }

    const escaped = jsStringEscape(allCharacters);

    // Do not use .equal; mega-diffs in the output are not helpful.
    t.ok(eval("'" + escaped + "'") === allCharacters);
    t.ok(eval('"' + escaped + '"') === allCharacters);
    t.end();
});

test('supports arbitrary objects', function (t) {
    t.equal(jsStringEscape(null), 'null');
    t.equal(jsStringEscape(undefined), 'undefined');
    t.equal(jsStringEscape(false), 'false');
    t.equal(jsStringEscape(0.0), '0');
    t.equal(jsStringEscape({}), '[object Object]');
    t.equal(jsStringEscape(''), '');
    t.end();
});
