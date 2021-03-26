import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment as env } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ApiService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  get = <T>(p = {}): Promise<T> => {
    const params = this._getParams(p);
    return this._http.get<T>(env.API_URL, { params }).toPromise();
  }

  post = <T, U>(data: T): Promise<U> => {
    return this._http.post<U>(env.API_URL, data).toPromise();
  }

  put = <T, U>(data: T, p = {}): Promise<U> => {
    const params = this._getParams(p);
    return this._http.put<U>(env.API_URL, data, { params }).toPromise();
  }

  delete = <T>(p = {}): Promise<T> => {
    const params = this._getParams(p);
    return this._http.delete<T>(env.API_URL, { params }).toPromise();
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
