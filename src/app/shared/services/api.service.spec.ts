import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ApiService } from "./api.service";
import { IArticle, IResponse } from "../interfaces";
import { environment as env } from "src/environments/environment";
import { HttpErrorResponse } from "@angular/common/http";

const mockData: IArticle = {
  title: "Test Title",
  description: "This is an example description",
  picture: "https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
};

describe("ApiService POST", () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        HttpClientTestingModule
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should able to create an article", () => {
    const mockResponse: IResponse = {
      status: "success",
      reason: ""
    };
    service.post<IArticle, IResponse>(mockData)
      .then((response: IResponse) => {
        expect(response.status).toEqual("success");
      })
      .catch(() => fail("expecting a status 201 request, returns error instead"));

    const req = httpTestingController.expectOne(env.API_URL);
    expect(req.request.method).toEqual("POST");
    req.flush(mockResponse);
  });

  it("should fail to create an article", () => {
    const mockResponse: IResponse = {
      status: "failed",
      reason: "Please check your inputs"
    };
    service.post<IArticle, IResponse>(mockData)
      .then((response: IResponse) => {
        expect(response.status).toEqual("failed");
      })
      .catch(() => fail("expecting a status 201 request, returns error instead"));

    const req = httpTestingController.expectOne(env.API_URL);
    expect(req.request.method).toEqual("POST");
    req.flush(mockResponse);
  });

  it("should return an error when the server returns a server error", () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: "Internal Server Error"
    });

    service.post<IArticle, IResponse>(mockData)
      .then(() => fail("expecting an error, not status 201"))
      .catch((error) => expect(error.status).toEqual(500));

    const req = httpTestingController.expectOne(env.API_URL);
    expect(req.request.method).toEqual("POST");
    req.flush(mockData, errorResponse);
  });

});

describe("ApiService GET", () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        HttpClientTestingModule
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should able to get all articles", () => {
    service.get<Array<IArticle>>()
      .then((response: Array<IArticle>) => {
        expect(response.length).toEqual(1);
      })
      .catch(() => fail("expecting a status 200 request, returns error instead"));

    const req = httpTestingController.expectOne(env.API_URL);
    expect(req.request.method).toEqual("GET");
    req.flush([mockData]);
  });

  it("should return an error when the server returns a server error", () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: "Internal Server Error"
    });

    service.get<Array<IArticle>>()
      .then(() => fail("expecting an error, not status 200"))
      .catch((error) => expect(error.status).toEqual(500));

    const req = httpTestingController.expectOne(env.API_URL);
    expect(req.request.method).toEqual("GET");
    req.flush(mockData, errorResponse);
  });

});

describe("ApiService PUT", () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        HttpClientTestingModule
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should able to update article", () => {
    const mockResponse: IResponse = {
      status: "success",
      reason: ""
    };
    service.put<IArticle, IResponse>(mockData, { id: 1 })
      .then((response: IResponse) => {
        expect(response.status).toEqual("success");
      })
      .catch(() => fail("expecting a status 204 request, returns error instead"));

    const req = httpTestingController.expectOne(`${env.API_URL}?id=1`);
    expect(req.request.method).toEqual("PUT");
    req.flush(mockResponse);
  });

  it("should return an error when the server returns a server error", () => {
    const mockResponse: IResponse = {
      status: "success",
      reason: ""
    };
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: "Internal Server Error"
    });

    service.put<IArticle, IResponse>(mockData, { id: 1 })
      .then(() => fail("expecting an error, not status 204"))
      .catch((error) => expect(error.status).toEqual(500));

    const req = httpTestingController.expectOne(`${env.API_URL}?id=1`);
    expect(req.request.method).toEqual("PUT");
    req.flush(mockResponse, errorResponse);
  });

});


describe("ApiService DELETE", () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        HttpClientTestingModule
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should able to update article", () => {
    const mockResponse: IResponse = {
      status: "success",
      reason: "Successfully deleted"
    };

    service.delete<IResponse>({ id: 1 })
      .then((response: IResponse) => {
        expect(response.status).toEqual("success");
      })
      .catch(() => fail("expecting a status 202 request, returns error instead"));

    const req = httpTestingController.expectOne(`${env.API_URL}?id=1`);
    expect(req.request.method).toEqual("DELETE");
    req.flush(mockResponse);
  });

  it("should return an error when the server returns a server error", () => {
    const mockResponse: IResponse = {
      status: "success",
      reason: "Successfully deleted"
    };
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: "Internal Server Error"
    });

    service.delete<IResponse>({ id: 1 })
      .then(() => fail("expecting an error, not status 202"))
      .catch((error) => expect(error.status).toEqual(500));

    const req = httpTestingController.expectOne(`${env.API_URL}?id=1`);
    expect(req.request.method).toEqual("DELETE");
    req.flush(mockResponse, errorResponse);
  });

});
