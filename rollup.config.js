import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  external: ['react', 'react-dom'],
  input   : 'index.tsx',

  output: {
    exports: 'named',
    file   : pkg.main,
    format : 'cjs',
  },

  plugins: [
    json(),
    resolve(),

    commonjs({
      include: ['node_modules/**'],
    }),

    typescript({
      clean                    : true,
      exclude                  : ['node_modules/**', '**/__tests__/**'],
      rollupCommonJSResolveHack: true,
    }),
  ],
}

