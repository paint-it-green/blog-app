import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment as env } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ApiService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  get = (p = {}): Observable<any> => {
    const params = this._getParams(p);
    return this._http.get(env.API_URL, { params });
  }

  post = <T, U>(data: T): Promise<U> => {
    return this._http.post<U>(env.API_URL, data).toPromise();
  }

  put = <T>(data: T, p = {}): Observable<any> => {
    const params = this._getParams(p);
    return this._http.put(env.API_URL, data, { params });
  }

  delete = (p = {}): Observable<any> => {
    const params = this._getParams(p);
    return this._http.delete(env.API_URL, { params });
  }

  private _getParams(p = {}): HttpParams {
    let params = new HttpParams();

    Object.entries(p).forEach((entry: any) => {
      const [key, value] = entry;
      params = params.set(key, value);
    });
    return params;
  }
}
