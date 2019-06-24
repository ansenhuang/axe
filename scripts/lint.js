const path = require('path');
const glob = require('glob');
const { spawnSync } = require('child_process');
const tslint = path.join(__dirname, '../node_modules/.bin/tslint');
const stylelint = path.join(__dirname, '../node_modules/.bin/stylelint');
const rootPath = path.join(__dirname, '..');
const entryPath = process.cwd();
const cssPattern = path.join(entryPath, 'src/**/*.css');
const isFix = process.argv.slice(2).includes('--fix');

spawnSync(tslint,
  [
    path.join(entryPath, 'src/**/*.ts'),
    !isFix && '--format',
    !isFix && 'stylish',
    isFix && '--fix'
  ].filter(Boolean),
  {
    cwd: rootPath,
    stdio: 'inherit',
    env : Object.assign({
      FORCE_COLOR: true,
    }, process.env)
  }
);

glob(cssPattern, { cwd: rootPath }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  if (files.length > 0) {
    spawnSync(stylelint, [cssPattern, isFix && '--fix'].filter(Boolean), { stdio: 'inherit', cwd: rootPath });
  }
});
