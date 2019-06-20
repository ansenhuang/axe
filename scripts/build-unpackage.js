const path = require('path');
const glob = require('glob');
const { spawnSync } = require('child_process');
const rimraf = path.join(__dirname, '../node_modules/.bin/rimraf');
const tsc = path.join(__dirname, '../node_modules/.bin/tsc');
const postcss = path.join(__dirname, '../node_modules/.bin/postcss');
const entryPath = process.cwd();
const cssPattern = 'src/**/*.css';

spawnSync(rimraf, [path.join(entryPath, 'unpkg')], { stdio: 'ignore' });
spawnSync(tsc, ['--build', 'tsconfig.lib.json'], { stdio: 'inherit', cwd: entryPath });

glob(cssPattern, { cwd: entryPath }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  if (files.length > 0) {
    spawnSync(postcss, [cssPattern, '--base', 'src', '--dir', 'unpkg', '--env', 'unpkg'], { stdio: 'inherit', cwd: entryPath });
  }
});
