import request, { setConfig } from '@axe/request';
import styles from './style.css';

const rootEl = document.getElementById('root');

const getBtn = document.createElement('button');
getBtn.className = styles.button;
getBtn.textContent = 'GET';
(rootEl as Element).appendChild(getBtn);
getBtn.addEventListener(
  'click',
  () => {
    request({
      method: 'get',
      url: 'https://www.easy-mock.com/mock/5ab628fd72286c70d351bcf9/example/query',
      query: {
        id: 1,
        name: 'name',
      },
    })
      .then(
        (data) => {
          console.info('resolve', data);
        },
        (response) => {
          console.info('reject', response);
        },
      )
      .catch((error) => {
        console.info('error', error);
      });
  },
  false,
);

const postBtn = document.createElement('button');
postBtn.className = styles.button;
postBtn.textContent = 'POST';
(rootEl as Element).appendChild(postBtn);
postBtn.addEventListener(
  'click',
  () => {
    request({
      method: 'post',
      url: 'https://www.easy-mock.com/mock/5ab628fd72286c70d351bcf9/example/test',
      data: {
        hh: 'fdsa',
        fdsa: 'fjdlsajl',
      },
      // dataType: 'json',
      // credentials: true
    })
      .then(
        (data) => {
          console.info('resolve', data);
        },
        (response) => {
          console.info('reject', response);
        },
      )
      .catch((error) => {
        console.info('error', error);
      });
  },
  false,
);

const jsonpBtn = document.createElement('button');
jsonpBtn.className = styles.button;
jsonpBtn.textContent = 'JSONP';
(rootEl as Element).appendChild(jsonpBtn);
jsonpBtn.addEventListener(
  'click',
  () => {
    request({
      method: 'jsonp',
      url: 'http://api.douban.com/v2/movie/search',
      // timeout: 1000,
      query: {
        start: 0,
        count: 10,
        q: '爱情',
      },
    })
      .then(
        (data) => {
          console.info('resolve', data);
        },
        (response) => {
          console.info('reject', response);
        },
      )
      .catch((error) => {
        console.info('error', error);
      });
  },
  false,
);

const fileBtn = document.createElement('input');
fileBtn.type = 'file';
fileBtn.className = styles.button;
(rootEl as Element).appendChild(fileBtn);
fileBtn.addEventListener(
  'change',
  (e) => {
    const file = (e.target as any).files[0];
    const formData = new FormData();
    formData.append('image', file);

    request({
      method: 'post',
      url: '/upload',
      data: formData,
    })
      .then(
        (data) => {
          console.info('resolve', data);
        },
        (response) => {
          console.info('reject', response);
        },
      )
      .catch((error) => {
        console.info('error', error);
      });
  },
  false,
);

setConfig({
  beforeRequest: (options) => {
    if (options.url === '/abort') {
      options.abort = true;
    }
    return options;
  },
});

const abortBtn = document.createElement('button');
abortBtn.className = styles.button;
abortBtn.textContent = 'It will be canceled by hook of beforeRequest';
(rootEl as Element).appendChild(abortBtn);
abortBtn.addEventListener(
  'click',
  () => {
    request({
      method: 'get',
      url: '/abort',
    })
      .then(
        (data) => {
          console.info('resolve', data);
        },
        (response) => {
          console.info('reject', response);
        },
      )
      .catch((error) => {
        console.info('error', error);
      });
  },
  false,
);
