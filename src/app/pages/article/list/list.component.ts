import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { IArticle, IArticleData, IResponse } from "src/app/shared/interfaces";
import { FormComponent } from "../form/form.component";
import { ApiService } from "src/app/shared/services";
import { Article } from "src/app/shared/models";
import { ConfirmDeleteComponent } from "src/app/shared/component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

  private _articles: Array<IArticleData> = [];
  private _perpage = 3;
  private _selectedArticle: IArticleData;
  canLoadMore = false;
  articles: Array<IArticleData> = [];
  hasArticles: boolean;

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _router: Router,
    private _modalService: BsModalService,
    private _bsModalRef: BsModalRef,
    private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this._initData();
  }

  loadMore(): void {
    this.articles.push(...this._getArticles(this._perpage));
    this.canLoadMore = !!this._articles.length;
    this.hasArticles = this.articles.length > 0;
  }

  private _getArticles(perPage: number): Array<IArticleData> {
    return this._articles.splice(0, perPage);
  }

  view(article: IArticleData): void {
    this._router.navigate(["details", article.id], { relativeTo: this._activeRoute });
  }

  confirmDelete(evt: Event, article: IArticleData): void {
    evt.stopPropagation();
    this._selectedArticle = article;
    const initialState = {
      message: "Delete Article?"
    };
    this._bsModalRef = this._modalService.show(ConfirmDeleteComponent, { initialState, class: "modal-sm" });
    this._bsModalRef.content.onClose
      .subscribe((flag: boolean) => {
        if (flag) {
          this.delete();
        }
      });
  }

  editArticle(evt: Event, article: IArticleData): void {
    evt.stopPropagation();
    const initialState = {
      title: "Edit Article",
      actionBtnName: "edit",
      article: new Article().deserialize(article)
    };
    this._bsModalRef = this._modalService.show(FormComponent, { initialState, ignoreBackdropClick: true, class: "modal-lg" });
    this._bsModalRef.content.onClose
      .subscribe((updatedArticle: IArticle) => {
        if (updatedArticle) {
          this._updateArticle(new Article().deserialize({ ...article, ...updatedArticle }).articleData);
        }
      });
  }

  private async delete(): Promise<void> {
    const { id } = this._selectedArticle;
    if (id) {
      try {
        const res = await this._apiService.delete<IResponse>({ id });
        if (res.status === "success") {
          this._removeDeleted(this._selectedArticle.id);
          this._selectedArticle = null;
        }
      } catch (error) { }
    }
  }

  private async _initData(): Promise<void> {
    try {
      const res = await this._apiService.get<Array<IArticleData>>();
      this._articles = res;
      this.loadMore();
    } catch (error) { }
  }

  private _updateArticle(article: IArticleData): void {
    const index = this.articles.findIndex((({ id }) => id === article.id));
    if (index >= 0) {
      this.articles[index] = article;
    }
  }

  private _removeDeleted(articleId: number): void {
    const index = this.articles.findIndex((({ id }) => id === articleId));
    this.articles.splice(index, 1);
  }

}
