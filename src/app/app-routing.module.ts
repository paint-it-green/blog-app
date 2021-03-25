import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { ArticleComponent } from "./pages/article/article.component";

const routes: Routes = [
  { path: "", redirectTo: "/article", pathMatch: "full" },
  {
    path: "article",
    component: ArticleComponent,
    loadChildren: () =>
      import("./pages/article/article.module").then((m) => m.ArticleModule),
  },
];

export const components = [
  ArticleComponent
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
