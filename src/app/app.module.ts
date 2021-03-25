import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BootstrapModule } from "./bootstrap.module";
import { AppRoutingModule, components } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent, ...components],
  imports: [
    BrowserModule,
    BootstrapModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
