import { HttpHeaders } from '@angular/common/http/src/headers';
import { HttpParams } from '@angular/common/http/src/params';

export interface IHttpOptions {
    observe?: string;
    reportProgress?: boolean;
    responseType?: string;
    withCredentials?: boolean;
}

export interface IRequestOptions extends IHttpOptions {
    headers?: HttpHeaders;
    params?: HttpParams;
}
