import tips from '@axe/tips';
import styles from './style.css';

const rootEl = document.getElementById('root');

const tipsBtn = document.createElement('button');
tipsBtn.className = styles.button;
tipsBtn.textContent = 'simple usage';
(rootEl as Element).appendChild(tipsBtn);
tipsBtn.addEventListener(
  'click',
  () => {
    tips.show('simple tips');
  },
  false,
);

const contentBtn = document.createElement('button');
contentBtn.className = styles.button;
contentBtn.textContent = 'tips with duration and callback';
(rootEl as Element).appendChild(contentBtn);
contentBtn.addEventListener(
  'click',
  () => {
    tips.show(
      {
        content: 'hide after 3s',
        duration: 3000,
      },
      () => {
        console.info('callback emited!');
      },
    );
  },
  false,
);

const contentHtmlBtn = document.createElement('button');
contentHtmlBtn.className = styles.button;
contentHtmlBtn.textContent = 'tips with html content';
(rootEl as Element).appendChild(contentHtmlBtn);
contentHtmlBtn.addEventListener(
  'click',
  () => {
    tips.show({
      contentHtml: ['<h3>title</h3>', '<p>here is tips text</p>'].join(''),
      duration: 3000,
    });
  },
  false,
);

const loadingBtn = document.createElement('button');
loadingBtn.className = styles.button;
loadingBtn.textContent = 'tips with loading';
(rootEl as Element).appendChild(loadingBtn);
loadingBtn.addEventListener(
  'click',
  () => {
    tips.show({
      contentHtml: `<i class="${styles.icon} ${styles['icon-loading']}"></i><p>loading</p>`,
      duration: 3000,
    });
  },
  false,
);

const successBtn = document.createElement('button');
successBtn.className = styles.button;
successBtn.textContent = 'tips with other icon';
(rootEl as Element).appendChild(successBtn);
successBtn.addEventListener(
  'click',
  () => {
    tips.show({
      contentHtml: `<i class="${styles.icon} ${styles['icon-success']}"></i><p>success</p>`,
      duration: 3000,
    });
  },
  false,
);
