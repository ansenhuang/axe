import { Config, Data, Options, Request } from './interfaces';
import { jsonp } from './jsonp';
import { appendToUrl, parseJSON, toQueryString } from './utils';

const contentType = {
  form: 'application/x-www-form-urlencoded; charset=utf-8',
  json: 'application/json; charset=utf-8',
  text: 'text/plain; charset=utf-8',
};

export const config: Config = {
  dataType: 'form',
  jsonpCallback: 'callback',
};

export const setConfig = (data: Config) => Object.assign(config, data);
export const request: Request = (options: Options) => {
  const beforeRequest = options.beforeRequest || config.beforeRequest;
  if (typeof beforeRequest === 'function') {
    options = beforeRequest(options);
  }

  if (options.abort) {
    throw new Error('[@axe/request]: request has been canceled.');
  }

  if (options.urlData) {
    const urlData = options.urlData;
    Object.keys(urlData).forEach((key) => {
      options.url = options.url.replace(`/:${key}/`, `/${urlData[key]}/`);
    });
  }

  if (options.method) {
    options.method = options.method.toUpperCase();
  }

  if (!options.headers) {
    options.headers = {};
  }

  const dataType = options.dataType || config.dataType;
  (options.headers as any)['Content-Type'] = contentType[dataType];

  if (options.method === 'JSONP') {
    return jsonp(options);
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    let body = null;

    if (options.query) {
      url = appendToUrl(url, options.query);
    }

    xhr.open(options.method || 'GET', url, true);

    if (options.method === 'POST') {
      if (options.data instanceof FormData) {
        (options.headers as Data)['Content-Type'] = null;
        body = options.data;
      } else {
        body = typeof options.data === 'string' ? options.data : toQueryString(options.data as Data);
      }
    }

    if (options.credentials) {
      xhr.withCredentials = true;
    }

    xhr.timeout = options.timeout || 0;

    if (xhr.setRequestHeader) {
      const headers = options.headers as Data;
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
    }

    xhr.onload = xhr.onerror = xhr.ontimeout = (e) => {
      let response = {
        type: e.type,
        status: xhr.status,
        statusText: xhr.statusText,
        data: parseJSON(xhr.responseText) as any,
        request: options,
      };

      const afterResponse = options.afterResponse || config.afterResponse;
      if (typeof afterResponse === 'function') {
        response = afterResponse(response);
      }

      if (response.status >= 200 && response.status < 300) {
        resolve(response.data);
      } else {
        reject(response);
      }
    };

    xhr.send(body);
  });
};
