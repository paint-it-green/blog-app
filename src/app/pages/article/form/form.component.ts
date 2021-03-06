import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";

import { BsModalRef } from "ngx-bootstrap/modal";

import { IArticle, IResponse } from "src/app/shared/interfaces";
import { Article } from "src/app/shared/models";
import { ApiService, HttpLoaderService } from "src/app/shared/services";

@Component({
  selector: "app-article-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  providers: [FormBuilder],
})
export class FormComponent implements OnInit, OnDestroy {

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _router: Router,
    public bsModalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _httpLoaderService: HttpLoaderService,
    private _cdRef: ChangeDetectorRef,
  ) { }

  onClose: Subject<IArticle>;
  title = "";
  actionBtnName = "";
  errorMessage = "";
  isLoading = false;
  form: FormGroup;
  article = new Article();
  private _subscription: Subscription;

  ngOnInit(): void {
    this.onClose = new Subject();
    this._initForm();
    this._initLoader();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _initLoader(): void {
    this._subscription = this._httpLoaderService
      .isLoading$
      .subscribe((flag) => {
        this.isLoading = flag;
        this._cdRef.detectChanges();
      }, () => {
        this.isLoading = false;
        this._cdRef.detectChanges();
      });
  }

  onSubmit(): void {
    if (this.isLoading) {
      return;
    }
    this.article.deserialize({ ...this.form.value });
    if (this.actionBtnName === "edit") {
      this._updateArticle();
    } else {
      this._saveArticle();
    }
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
    if (this.actionBtnName === "edit") {
      this.form.patchValue(this.article.articleData);
    }
  }

  private async _saveArticle(): Promise<void> {
    try {
      const res = await this._apiService.post<IArticle, IResponse>(this.article.article);
      this.errorMessage = (res.status === "failed") ? res.reason : "";
      if (res.status === "success") {
        this._onSuccess(true);
      }
    } catch (error) {
      this.errorMessage = "Something went wrong";
    }
  }

  private async _updateArticle(): Promise<void> {
    try {
      const res = await this._apiService.put<IArticle, IResponse>(this.article.article, { id: this.article.id });
      this.errorMessage = (res.status === "failed") ? res.reason : "";
      if (res.status === "success") {
        this._onSuccess(false);
      }
    } catch (error) {
      this.errorMessage = "Something went wrong";
    }
  }

  private _onSuccess(shouldRedirect: boolean): void {
    this.form.reset();
    this.onClose.next(this.article.article);
    this.bsModalRef.hide();
    if (shouldRedirect) {
      this._router.navigateByUrl("/")
        .then(() => this._router.navigate(["article"], { relativeTo: this._activeRoute.root }));
    }
  }

}
