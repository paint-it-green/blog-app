import { TestBed } from "@angular/core/testing";

import { CustomRouteReuseStrategyService } from "./custom-route-reuse-strategy.service";

describe("CustomRouteReuseStrategyService", () => {
  let service: CustomRouteReuseStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomRouteReuseStrategyService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
