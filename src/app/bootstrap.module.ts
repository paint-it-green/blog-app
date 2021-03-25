import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertModule } from "ngx-bootstrap/alert";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    AlertModule,
    ModalModule
  ],
})
export class BootstrapModule { }
