/**
 * A tiny library for request.
 * @module @axe/request
 */ /** */

import { Options, Request } from './interfaces';
import { config } from './request';
import { appendToUrl, parseJSON } from './utils';

/**
 * @ignore
 */
export const jsonp: Request = (options: Options) => {
  return new Promise((resolve, reject) => {
    const callbackName = 'axe_request_' + Date.now();
    const script = document.createElement('script');
    let abort = false;
    let data: any = null;
    let query = options.query || {};

    if (typeof options.query === 'string') {
      query += `&${config.jsonpCallback}=${callbackName}`;
    } else {
      (query as any)[config.jsonpCallback as string] = callbackName;
    }

    (window as any)[callbackName] = (result: any) => {
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      data = parseJSON(result);
    };

    const handler = (type: string) => {
      let response = {
        type,
        status: type === 'load' ? 200 : -1,
        statusText: type === 'load' ? 'ok' : 'fail',
        data,
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

    script.type = 'text/javascript';
    script.onload = script.onerror = (e) => {
      if (abort) {
        return;
      }
      handler((e as any).type);
    };
    script.src = appendToUrl(options.url, query);

    document.body.appendChild(script);

    if (options.timeout) {
      setTimeout(() => {
        abort = true;
        handler('timeout');
      }, options.timeout);
    }
  });
};
