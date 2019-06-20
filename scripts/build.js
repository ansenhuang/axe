const path = require('path');
const glob = require('glob');
const { spawnSync } = require('child_process');
const rimraf = path.join(__dirname, '../node_modules/.bin/rimraf');
const rollup = path.join(__dirname, '../node_modules/.bin/rollup');
const tsc = path.join(__dirname, '../node_modules/.bin/tsc');
const postcss = path.join(__dirname, '../node_modules/.bin/postcss');
const rootPath = path.join(__dirname, '..');
const entryPath = process.cwd();
const cssPattern = 'src/**/*.css';

// build library
spawnSync(rimraf, [path.join(entryPath, 'lib')], { stdio: 'ignore' });
spawnSync(rollup, ['-c'], {
  stdio: 'inherit',
  cwd: rootPath,
  env: Object.assign({
    ENTRY: path.basename(entryPath),
  }, process.env)
});

// build unpkg
spawnSync(rimraf, [path.join(entryPath, 'unpkg')], { stdio: 'ignore' });
spawnSync(tsc, [], { stdio: 'inherit', cwd: entryPath });

glob(cssPattern, { cwd: entryPath }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  if (files.length > 0) {
    spawnSync(postcss, [cssPattern, '--base', 'src', '--dir', 'unpkg', '--env', 'unpkg'], { stdio: 'inherit', cwd: entryPath });
  }
});
