import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";

import { ConfirmDeleteComponent } from "./confirm-delete.component";

describe("ConfirmDeleteComponent", () => {
  let component: ConfirmDeleteComponent;
  let fixture: ComponentFixture<ConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteComponent],
      providers: [
        BsModalRef
      ],
      imports: [
        ModalModule.forRoot(),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
