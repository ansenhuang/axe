const path = require('path');
const { spawnSync } = require('child_process');

const hasUncommited = spawnSync('git', ['status', '--porcelain']).stdout.toString();
if (hasUncommited !== '') {
  console.log('还有未提交的代码！');
  process.exit(1);
}

const currentBranch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout.toString().trim();
if (currentBranch === 'master') {
  console.log('不能直接在master分支上发布！');
  process.exit(1);
}

// 合并代码到master
spawnSync('git', ['push'], { stdio: 'ignore' });
spawnSync('git', ['checkout', 'master'], { stdio: 'ignore' });
spawnSync('git', ['pull'], { stdio: 'ignore' });
spawnSync('git', ['merge', '--no-ff', currentBranch, '--message', `ci: merge from ${currentBranch}`], { stdio: 'ignore' });
const pushResults = spawnSync('git', ['push'], { stdio: 'ignore' });

if (pushResults.status !== 0) {
  process.exit(1);
  console.log('\nMerge failed!!!');
}
