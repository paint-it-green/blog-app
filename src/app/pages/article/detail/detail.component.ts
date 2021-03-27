import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { ApiService } from "src/app/shared/services";
import { IArticleData, IResponse } from "src/app/shared/interfaces";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {

  constructor(
    private readonly _location: Location,
    private readonly _activeRoute: ActivatedRoute,
    private _modalService: BsModalService,
    private _bsModalRef: BsModalRef,
    private _apiService: ApiService,
  ) { }

  article: IArticleData;
  errorMessage: string;
  articleId: number;

  ngOnInit(): void {
    this.articleId = +this._activeRoute.snapshot.paramMap.get("id");
    this._getArticle(this.articleId);
  }

  back(): void {
    this._location.back();
  }

  confirmDelete(template: TemplateRef<any>): void {
    const initialState = {
      confirmMessage: "Delete Article?"
    };
    this._bsModalRef = this._modalService.show(template, { initialState, class: "modal-sm" });
  }

  async delete(): Promise<void> {
    if (this.articleId) {
      try {
        const res = await this._apiService.delete<IResponse>({ id: this.articleId });
        this._bsModalRef.hide();
        if (res.status === "success") {
          this.back();
        }
      } catch (error) { }
    }
  }

  decline(): void {
    this._bsModalRef.hide();
  }

  private async _getArticle(id: number): Promise<void> {
    try {
      const article = await this._apiService.get<IArticleData>({ id });
      if (!article.id) {
        this.errorMessage = "Article not found";
      } else {
        this.article = article;
      }
    } catch (error) { }
  }

}
