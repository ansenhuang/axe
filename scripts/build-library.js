const path = require('path');
const { spawnSync } = require('child_process');
const rimraf = path.join(__dirname, '../node_modules/.bin/rimraf');
const rollup = path.join(__dirname, '../node_modules/.bin/rollup');
const rootPath = path.join(__dirname, '..');
const entryPath = process.cwd();

spawnSync(rimraf, [path.join(entryPath, 'lib')], { stdio: 'ignore' });
spawnSync(rollup, ['-c'], {
  stdio: 'inherit',
  cwd: rootPath,
  env: Object.assign({
    ENTRY: path.basename(entryPath),
  }, process.env)
});
