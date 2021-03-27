import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-confirm-delete",
  templateUrl: "./confirm-delete.component.html",
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    private _bsModalRef: BsModalRef,
  ) { }

  onClose: Subject<boolean>;
  message = "Confirm deletion?";

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  confirm(): void {
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  decline(): void {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

}
