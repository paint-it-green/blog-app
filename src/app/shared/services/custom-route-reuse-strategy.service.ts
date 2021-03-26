import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, UrlSegment } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CustomRouteReuseStrategyService implements RouteReuseStrategy {


  storedHandles: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return (route.data.noReuse) ? false : true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const id = this.createIdentifier(route);
    if (!route.data.noReuse) {
      this.storedHandles[id] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const id = this.createIdentifier(route);
    const handle = this.storedHandles[id];
    const canAttach = !!route.routeConfig && !!handle;
    return canAttach;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const id = this.createIdentifier(route);
    if (!route.routeConfig || !this.storedHandles[id]) {
      return null;
    }
    return this.storedHandles[id];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    let shouldReuse = future.routeConfig === curr.routeConfig;

    if (shouldReuse && curr.data.noReuse) {
      shouldReuse = false;
    }
    return shouldReuse;
  }

  private createIdentifier(route: ActivatedRouteSnapshot): string {
    const segments: UrlSegment[][] = route.pathFromRoot.map(r => r.url);
    const subpaths = ([] as UrlSegment[]).concat(...segments).map(segment => segment.path);
    return segments.length + "-" + subpaths.join("/");
  }

}
