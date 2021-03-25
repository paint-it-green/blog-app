import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const newHeaders = this._addHeaders(req.headers);
    const authReq = req.clone({ headers: newHeaders });

    return next.handle(authReq);
  }

  private _addHeaders(headers: HttpHeaders): HttpHeaders {
    headers = headers.append("Authorization", `Bearer ${env.API_TOKEN}`);
    return headers;
  }

}
