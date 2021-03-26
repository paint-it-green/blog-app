import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpLoaderService {
  activeRequests$: BehaviorSubject<number>;
  isLoading$: Observable<boolean>;

  constructor() {
    this.activeRequests$ = new BehaviorSubject(0);
    this.isLoading$ = this.activeRequests$.pipe(
      map((requests) => requests > 0)
    );
  }

  onRequestStart(): void {
    this.activeRequests$.next(this.activeRequests$.value + 1);
  }

  onRequestEnd(): void {
    const value = this.activeRequests$.value > 0 ? this.activeRequests$.value - 1 : 0;
    this.activeRequests$.next(value);
  }

  clear(): void {
    this.activeRequests$.next(0);
  }
}
