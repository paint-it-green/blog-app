import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { environment as env } from "src/environments/environment";
import { HttpLoaderService } from "./http-loader.service";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private httpLoaderService: HttpLoaderService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._onStart();
    const newHeaders = this._addHeaders(req.headers);
    const authReq = req.clone({ headers: newHeaders });

    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._onEnd();
        }
      }, () => this._onEnd())
    );
  }

  private _addHeaders(headers: HttpHeaders): HttpHeaders {
    headers = headers.append("Authorization", `Bearer ${env.API_TOKEN}`);
    return headers;
  }

  private _onStart(): void {
    this.httpLoaderService.onRequestStart();
  }

  private _onEnd(): void {
    this.httpLoaderService.onRequestEnd();
  }

}
