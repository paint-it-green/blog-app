import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ArticleRoutingModule, components } from "./article-routing.module";
import { FormComponent } from "./form/form.component";

@NgModule({
  declarations: [...components, FormComponent],
  entryComponents: [FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticleRoutingModule,
  ]
})
export class ArticleModule { }
