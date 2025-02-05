import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');
export default {
  input: `src/index.ts`,
  output: [
    { file: 'dist/bundle.js', name: 'index', format: 'iife', sourcemap: false }
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
  ],
};