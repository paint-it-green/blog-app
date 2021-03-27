import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouteReuseStrategy } from "@angular/router";

import { AppComponent } from "./app.component";
import { BootstrapModule } from "./bootstrap.module";
import { AppRoutingModule, components } from "./app-routing.module";
import { HttpInterceptorService, CustomRouteReuseStrategyService } from "./shared/services";

@NgModule({
  declarations: [AppComponent, ...components],
  imports: [
    BrowserModule,
    BootstrapModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategyService,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
