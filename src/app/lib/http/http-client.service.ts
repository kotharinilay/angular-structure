import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpOptions, RequestOptions } from 'app/shared/interfaces/http-interface';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get(url: string, headers?: any, params?: any, options?: HttpOptions) {
    return this.http.get(url, <any>this.getRequestOptions(headers, params, options));
  }

  private getRequestOptions(headers?: any, params?: any, options?: HttpOptions): RequestOptions {
    headers = headers || {};
    params = params || {};
    options = new HttpOptions(options);

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    const customHeader = new HttpHeaders(headers);

    const customParams = new HttpParams();
    for (const key of Object.keys(params)) {
      customParams.append(key, params[key]);
    }
    const requestOptions = Object.assign({}, options);
    requestOptions['headers'] = customHeader;
    requestOptions['params'] = customParams;
    return requestOptions;
  }
}
