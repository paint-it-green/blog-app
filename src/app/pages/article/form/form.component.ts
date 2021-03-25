import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BsModalRef } from "ngx-bootstrap/modal";
import { IArticle, IResponse } from "src/app/shared/interfaces";

import { Article } from "src/app/shared/models/article.model";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-article-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  providers: [FormBuilder],
})
export class FormComponent implements OnInit {

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _router: Router,
    public bsModalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
  ) { }

  title = "";
  actionBtnName = "";
  errorMessage = "";
  form: FormGroup;
  article = new Article();

  ngOnInit(): void {
    this._initForm();
  }

  onSubmit(): void {
    this.article.deserialize({ ...this.form.value });
    this._saveArticle();
  }

  get formControl(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(69)]],
      description: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(499)]],
      picture: ["", [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
    });
  }

  private async _saveArticle(): Promise<void> {
    try {
      const res = await this._apiService.post<IArticle, IResponse>(this.article.article);
      this.errorMessage = (res.status === "failed") ? res.reason : "";
      if (res.status === "success") {
        this._onSuccess();
      }
    } catch (error) {
      this.errorMessage = "Something went wrong";
    }
  }

  private _onSuccess(): void {
    this.form.reset();
    this.bsModalRef.hide();
    this._router.navigate(["article"], { relativeTo: this._activeRoute.root });
  }

}
