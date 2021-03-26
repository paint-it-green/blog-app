import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { RouterTestingModule } from "@angular/router/testing";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";

import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
