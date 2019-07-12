import { Data } from './interfaces';

export const toQueryString = (data: Data) => {
  return Object.keys(data)
    .map((key) => {
      let value = data[key];
      if (value && typeof value === 'object') {
        value = JSON.stringify(value);
      }
      return key + '=' + value;
    })
    .join('&');
};

export const appendToUrl = (url: string, data: Data | string) => {
  const urls = url.split('#');
  const sign = urls[0].includes('?') ? '&' : '?';
  const query = typeof data === 'string' ? data : toQueryString(data);
  return urls[0] + (query ? sign + query : '') + (urls[1] || '');
};

export const parseJSON = (json: Data | string) => {
  if (typeof json === 'string') {
    try {
      json = JSON.parse(json);
    } catch (error) {
      // needn't do anything
    }
  }
  return json;
};
