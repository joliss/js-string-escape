import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

function getRollupObject ({file, minifying = false, format = 'umd'} = {}) {
    const nonMinified = {
        input: 'src/index.js',
        output: {
            format,
            sourcemap: minifying,
            name: 'JSStringEscape',
            file: file || `dist/index-${format}${minifying ? '.min' : ''}.js`
        },
        plugins: [
            babel({
                babelHelpers: 'bundled'
            })
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
}

export default [
    getRollupObject(),
    getRollupObject({
        minifying: true
    }),
    getRollupObject({
        format: 'es'
    }),
    getRollupObject({
        minifying: true,
        format: 'es'
    })
];
