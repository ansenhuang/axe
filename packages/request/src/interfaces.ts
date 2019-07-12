/**
 * A tiny library for request.
 * @module @axe/request
 */ /** */

type BeforeRequest = (options: Options) => Options;
type AfterResponse = (response: Response) => Response;
type Method = 'get' | 'post' | 'jsonp' | string;
type DataType = 'form' | 'json' | 'text';

/**
 * @ignore
 */
export interface Data {
  [key: string]: any;
}

export type Request = (options: Options) => Promise<Data | Response>;
export interface Response {
  type: string;
  status: number;
  statusText: string;
  data: Data | null;
  request: Options;
}

export interface Config {
  dataType?: DataType;
  jsonpCallback?: string;
  headers?: Data;
  beforeRequest?: BeforeRequest;
  afterResponse?: AfterResponse;
}

export interface Options {
  abort?: boolean;
  headers?: Data;
  url: string;
  method?: Method;
  credentials?: boolean;
  timeout?: number;
  urlData?: Data;
  query?: Data | string;
  data?: Data | FormData | string;
  dataType?: DataType;
  beforeRequest?: BeforeRequest;
  afterResponse?: AfterResponse;
}
