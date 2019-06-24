const path = require('path');
const { spawnSync } = require('child_process');

const hasUncommited = spawnSync('git', ['status', '--porcelain']).stdout.toString();
if (hasUncommited !== '') {
  console.log('还有未提交的代码！');
  process.exit();
}

const currentBranch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout.toString().trim();
if (currentBranch === 'master') {
  console.log('不能直接在master分支上发布！');
  process.exit();
}

// 合并代码到master
spawnSync('git', ['checkout', 'master'], { stdio: 'ignore' });
spawnSync('git', ['pull'], { stdio: 'ignore' });
spawnSync('git', ['merge', '--no-ff', currentBranch, '--message', `merge: automatically merged by ${currentBranch}`], { stdio: 'ignore' });
spawnSync('git', ['push'], { stdio: 'inherit' });

// 开始发布
spawnSync('yarn', ['test'], { stdio: 'inherit' });
spawnSync('yarn', ['build'], { stdio: 'inherit' });
spawnSync('lerna', ['publish'], { stdio: 'inherit' });
spawnSync('yarn', ['deploy'], { stdio: 'inherit' });
