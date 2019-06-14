const fs = require('fs');
const path = require('path');
const clean = require('rollup-plugin-delete');
const json = require('rollup-plugin-json');
const postcss = require('rollup-plugin-postcss');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

const extensions = ['.ts', '.js'];
const moduleExports = 'named';
const entryPoints = fs.readdirSync(path.resolve('packages'));

export default entryPoints.map(point => {
  const baseDir = path.resolve('packages', point);
  const moduleName = '$axe_' + point;
  return {
    input: path.join(baseDir, 'src/index.ts'),
    output: [
      { file: path.join(baseDir, 'lib/index.cjs.js'), format: 'cjs', sourcemap: true, exports: moduleExports },
      { file: path.join(baseDir, 'lib/index.esm.js'), format: 'esm', sourcemap: true },
      { file: path.join(baseDir, 'lib/index.umd.js'), format: 'umd', sourcemap: true, name: moduleName, exports: moduleExports },
    ].filter(Boolean),
    external: id => {
      return id.indexOf('core-js') !== -1;
    },
    plugins: [
      clean({
        targets: path.join(baseDir, 'lib/*'),
      }),
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
  }
});
