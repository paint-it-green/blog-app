import { Component, OnInit, TemplateRef } from "@angular/core";
import { Location } from "@angular/common";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {

  constructor(
    private readonly _location: Location,
    private _modalService: BsModalService,
    private _bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
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

  delete(): void {
    this._bsModalRef.hide();
  }

  decline(): void {
    this._bsModalRef.hide();
  }

}
