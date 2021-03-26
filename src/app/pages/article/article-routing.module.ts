import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";


const routes: Routes = [
  { path: "", component: ListComponent, data: { noReuse: true } },
  { path: "details/:id", component: DetailComponent, },
];

export const components = [
  ListComponent,
  DetailComponent
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ArticleRoutingModule { }
