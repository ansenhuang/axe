import modal from '@axe/modal';
import styles from './style.css';

const rootEl = document.getElementById('root');

const modalBtn = document.createElement('button');
modalBtn.className = styles.button;
modalBtn.textContent = 'simple usage';
(rootEl as Element).appendChild(modalBtn);
modalBtn.addEventListener(
  'click',
  () => {
    modal.show('simple modal');
  },
  false,
);

const modalWithOptionsBtn = document.createElement('button');
modalWithOptionsBtn.className = styles.button;
modalWithOptionsBtn.textContent = 'customize options';
(rootEl as Element).appendChild(modalWithOptionsBtn);
modalWithOptionsBtn.addEventListener(
  'click',
  () => {
    modal.show(
      {
        title: 'title',
        content: 'this is content',
      },
      (closeType) => {
        console.info(closeType);
      },
    );
  },
  false,
);

const modalWithCancelBtn = document.createElement('button');
modalWithCancelBtn.className = styles.button;
modalWithCancelBtn.textContent = 'show cancel button';
(rootEl as Element).appendChild(modalWithCancelBtn);
modalWithCancelBtn.addEventListener(
  'click',
  () => {
    modal.show(
      {
        title: 'title',
        content: 'this is content',
        cancelText: '取消',
      },
      (closeType) => {
        console.info(closeType);
      },
    );
  },
  false,
);

const modalWithHtmlBtn = document.createElement('button');
modalWithHtmlBtn.className = styles.button;
modalWithHtmlBtn.textContent = 'customize content with html';
(rootEl as Element).appendChild(modalWithHtmlBtn);
modalWithHtmlBtn.addEventListener(
  'click',
  () => {
    modal.show(
      {
        contentHtml: ['<h3>Form</h3>', `<input class="${styles.input}" />`].join(''),
      },
      (closeType) => {
        console.info(closeType);
      },
    );
  },
  false,
);

const modalWithQueueBtn = document.createElement('button');
modalWithQueueBtn.className = styles.button;
modalWithQueueBtn.textContent = 'a new modal show before current modal close';
(rootEl as Element).appendChild(modalWithQueueBtn);
modalWithQueueBtn.addEventListener(
  'click',
  () => {
    modal.show('current modal');
    modal.show('new modal');
  },
  false,
);
