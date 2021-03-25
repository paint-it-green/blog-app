import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BootstrapModule } from "./bootstrap.module";
import { AppRoutingModule, components } from "./app-routing.module";
import { HttpInterceptorService } from "./shared/services/http-interceptor.service";

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
