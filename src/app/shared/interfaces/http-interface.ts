import { HttpHeaders } from '@angular/common/http/src/headers';
import { HttpParams } from '@angular/common/http/src/params';

export class HttpOptions {
    constructor(options: HttpOptions = {}) {
        this.observe = options.observe || 'body';
        this.responseType = options.responseType || 'json';
    }
    public observe?: string;
    public reportProgress?: boolean;
    public responseType?: string;
    public withCredentials?: boolean;
}

export class RequestOptions extends HttpOptions {
    public headers?: HttpHeaders;
    public params?: HttpParams;
}
