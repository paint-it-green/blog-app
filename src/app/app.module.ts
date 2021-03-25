import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BootstrapModule } from "./bootstrap.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BootstrapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
