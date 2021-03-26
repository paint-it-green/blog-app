import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { RouterTestingModule } from "@angular/router/testing";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";

import { DetailComponent } from "./detail.component";

describe("DetailComponent", () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BsModalRef
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        ModalModule.forRoot(),
        HttpClientTestingModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
