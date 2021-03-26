import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { RouterTestingModule } from "@angular/router/testing";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";
import { ReactiveFormsModule } from "@angular/forms";

import { FormComponent } from "./form.component";
import { IArticle } from "src/app/shared/interfaces";

const article: IArticle = {
  title: "Test Title",
  description: "This is an example description",
  picture: "https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
};

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BsModalRef
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        ModalModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render input elements", () => {
    const compiled = fixture.debugElement.nativeElement;
    const titleInput = compiled.querySelector("input[id=\"articleTitle\"]");
    const descriptionInput = compiled.querySelector("textarea[id=\"articleDescription\"]");
    const pictureInput = compiled.querySelector("input[id=\"articlePicture\"]");

    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(pictureInput).toBeTruthy();
  });

  it("should test form validity", () => {
    const form = component.form;
    expect(form.valid).toBeFalsy();
    form.patchValue(article);
    expect(form.valid).toBeTruthy();
  });

  it("should test input validity", () => {
    const titleInput = component.form.controls.title;
    const descriptionInput = component.form.controls.description;
    const picture = component.form.controls.picture;

    expect(titleInput.valid).toBeFalsy();
    expect(descriptionInput.valid).toBeFalsy();
    expect(picture.valid).toBeFalsy();

    titleInput.setValue(article.title);
    expect(titleInput.valid).toBeTruthy();

    descriptionInput.setValue(article.description);
    expect(descriptionInput.valid).toBeTruthy();

    picture.setValue(article.picture);
    expect(picture.valid).toBeTruthy();
  });

  it("should test input errors", () => {
    const titleInput = component.form.controls.title;
    expect(titleInput.errors.required).toBeTruthy();

    titleInput.setValue("a");
    expect(titleInput.errors.minlength).toBeTruthy();

    titleInput.setValue(new Array(70).fill("a").join(""));
    expect(titleInput.errors.maxlength).toBeTruthy();

    titleInput.setValue(article.title);
    expect(titleInput.errors).toBeNull();

    const descriptionInput = component.form.controls.description;
    expect(descriptionInput.errors.required).toBeTruthy();

    descriptionInput.setValue("a");
    expect(descriptionInput.errors.minlength).toBeTruthy();

    descriptionInput.setValue(new Array(500).fill("a").join(""));
    expect(descriptionInput.errors.maxlength).toBeTruthy();

    descriptionInput.setValue(article.description);
    expect(descriptionInput.errors).toBeNull();

    const pictureInput = component.form.controls.picture;
    expect(pictureInput.errors.required).toBeTruthy();

    pictureInput.setValue("test");
    expect(pictureInput.errors.pattern).toBeTruthy();

    pictureInput.setValue(article.picture);
    expect(pictureInput.errors).toBeNull();
  });

});
