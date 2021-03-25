import { Component, OnInit } from "@angular/core";

import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-article-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  title = "";
  actionBtnName = "";

  ngOnInit(): void { }

}
