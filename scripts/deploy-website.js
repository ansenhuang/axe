const path = require('path');
const { spawnSync } = require('child_process');
const websitePath = path.resolve('website');

spawnSync('touch', ['.nojekyll'], { stdio: 'ignore', cwd: websitePath });
spawnSync('git', ['init'], { stdio: 'ignore', cwd: websitePath });
spawnSync('git', ['add', '.'], { stdio: 'ignore', cwd: websitePath });
spawnSync('git', ['commit', '-m', 'deploy: update gh-pages'], { stdio: 'ignore', cwd: websitePath });
spawnSync('git', ['push', '-f', 'git@github.com:ansenhuang/axe.git', 'master:gh-pages'], { stdio: 'inherit', cwd: websitePath });

console.log('\nWebsite deployed!!!');
