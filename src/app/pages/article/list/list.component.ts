import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { FormComponent } from "../form/form.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

  private _articles = new Array(10).fill(null);
  private _perpage = 3;
  private _currentPage = 1;
  canLoadMore = true;
  articles = [];

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _router: Router,
    private _modalService: BsModalService,
    private _bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    this.articles.push(...this._getArticles(this._currentPage, this._perpage));
    this._currentPage++;
    this.canLoadMore = this.articles.length !== this._articles.length;
  }

  private _getArticles(currentPage, perPage): Array<null> {
    const offset = (currentPage - 1) * perPage;
    const length = offset + perPage;
    const copy = [...this._articles];
    return copy.slice(offset, length);
  }

  view(): void {
    this._router.navigate(["details/1"], { relativeTo: this._activeRoute });
  }

  confirmDelete(evt: Event, template: TemplateRef<any>): void {
    evt.stopPropagation();
    const initialState = {
      confirmMessage: "Delete Article?"
    };
    this._bsModalRef = this._modalService.show(template, { initialState, class: "modal-sm" });
  }

  editArticle(evt: Event): void {
    evt.stopPropagation();
    const initialState = {
      title: "Edit Article",
      actionBtnName: "Edit",
    };
    this._bsModalRef = this._modalService.show(FormComponent, { initialState, ignoreBackdropClick: true, class: "modal-lg" });
  }

  delete(): void {
    this._bsModalRef.hide();
  }

  decline(): void {
    this._bsModalRef.hide();
  }

}
