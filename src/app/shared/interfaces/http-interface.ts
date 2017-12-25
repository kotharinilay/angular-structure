import { HttpHeaders } from '@angular/common/http/src/headers';
import { HttpParams } from '@angular/common/http/src/params';

export class IHttpOptions {
    public observe?: string;
    public reportProgress?: boolean;
    public responseType?: string;
    public withCredentials?: boolean;
}

export class IRequestOptions extends IHttpOptions {
    public headers?: HttpHeaders;
    public params?: HttpParams;
}
