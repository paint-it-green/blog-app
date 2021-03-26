import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { HttpLoaderService } from "./shared/services/http-loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {

  constructor(
    private _httpLoaderService: HttpLoaderService,
    private _cdRef: ChangeDetectorRef,
  ) { }

  showLoading = false;

  ngOnInit(): void {
    this._httpLoaderService
      .isLoading$
      .subscribe((flag) => {
        this.showLoading = flag;
        this._cdRef.detectChanges();
      }, () => {
        this.showLoading = false;
        this._cdRef.detectChanges();
      });
  }
}
