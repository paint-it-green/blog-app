import { Component, OnInit } from "@angular/core";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { FormComponent } from "./form/form.component";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"],
  providers: [BsModalRef],
})
export class ArticleComponent implements OnInit {

  constructor(
    private _modalService: BsModalService,
  ) { }

  ngOnInit(): void { }

  addArticle(): void {
    const initialState = {
      title: "Add Article",
      actionBtnName: "add",
    };
    this._modalService.show(FormComponent, { initialState, ignoreBackdropClick: true, class: "modal-lg" });
  }

}
