import tips from '@axe/tips';
import styles from './style.css';

const rootEl = document.getElementById('root');

const tipsBtn = document.createElement('button');
tipsBtn.className = styles.button;
tipsBtn.textContent = '简单提示';
(rootEl as Element).appendChild(tipsBtn);
tipsBtn.addEventListener(
  'click',
  () => {
    tips.show('简单的提示');
  },
  false,
);

const contentBtn = document.createElement('button');
contentBtn.className = styles.button;
contentBtn.textContent = '设置提示时间和回调';
(rootEl as Element).appendChild(contentBtn);
contentBtn.addEventListener(
  'click',
  () => {
    tips.show(
      {
        content: '设置提示的时间3s',
        duration: 3000,
      },
      () => {
        console.info('提示关闭时的回调');
      },
    );
  },
  false,
);

const contentHtmlBtn = document.createElement('button');
contentHtmlBtn.className = styles.button;
contentHtmlBtn.textContent = '自定义提示内容';
(rootEl as Element).appendChild(contentHtmlBtn);
contentHtmlBtn.addEventListener(
  'click',
  () => {
    tips.show({
      contentHtml: ['<h3>标题</h3>', '<p>这里是自定义的提示内容</p>'].join(''),
      duration: 3000,
    });
  },
  false,
);

const loadingBtn = document.createElement('button');
loadingBtn.className = styles.button;
loadingBtn.textContent = '自定义加载中提示';
(rootEl as Element).appendChild(loadingBtn);
loadingBtn.addEventListener(
  'click',
  () => {
    tips.show({
      contentHtml: `<i class="${styles.icon} ${styles['icon-loading']}"></i><p>加载中</p>`,
      duration: 3000,
    });
  },
  false,
);

const successBtn = document.createElement('button');
successBtn.className = styles.button;
successBtn.textContent = '自定义提示的图标';
(rootEl as Element).appendChild(successBtn);
successBtn.addEventListener(
  'click',
  () => {
    tips.show({
      contentHtml: `<i class="${styles.icon} ${styles['icon-success']}"></i><p>成功</p>`,
      duration: 3000,
    });
  },
  false,
);
