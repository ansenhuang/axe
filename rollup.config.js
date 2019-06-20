const path = require('path');
const json = require('rollup-plugin-json');
const postcss = require('rollup-plugin-postcss');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

function createConfig({
  entry,
  extensions = ['.ts', '.js'],
  moduleExports = 'named',
}) {
  const baseDir = path.join(__dirname, 'packages', entry);
  const moduleName = '$axe_' + entry.replace('-', '_');
  return {
    input: path.join(baseDir, 'src/index.ts'),
    output: [
      { file: path.join(baseDir, 'lib/index.cjs.js'), format: 'cjs', sourcemap: true, exports: moduleExports },
      { file: path.join(baseDir, 'lib/index.esm.js'), format: 'esm', sourcemap: true },
      { file: path.join(baseDir, 'lib/index.umd.js'), format: 'umd', sourcemap: true, name: moduleName, exports: moduleExports },
    ],
    external: id => {
      return id.indexOf('core-js') !== -1;
    },
    plugins: [
      json(),
      postcss({
        extensions: ['.css'],
        modules: true,
        inject: true,
        extract: false,
      }),
      babel({
        extensions,
      }),
      commonjs(),
      resolve({
        extensions,
      }),
    ],
  };
}

export default createConfig({
  entry: process.env.ENTRY,
});
