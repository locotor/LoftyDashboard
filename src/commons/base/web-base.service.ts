import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { NzNotificationService } from "ng-zorro-antd";

@Injectable()
export class WebBaseService {
  constructor(
    http: HttpClient,
    notification: NzNotificationService) {
    this.http = http;
    this.notification = notification;
  }
  protected http: HttpClient;
  protected notification: NzNotificationService;
  protected baseUrl: string = "";
  protected httpParam: HttpParams;
  protected headerBase = new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8"
  });

  // get方式发起请求
  protected getData(url: string, data: object): Observable<object> {
    let queryString: string = $.param(data);
    const httpParam: HttpParams = new HttpParams({ fromString: queryString });
    url = this.baseUrl + url;
    return this.http.get(url, { params: httpParam }).map((rspd: any) => {
      if (rspd.Code === 500) {
        this.onBackendError(rspd.Message);
      }
      return rspd.Data;
    });
  }

  // post方式发起请求
  protected postData(url: string, data: object): Observable<object> {
    return this.http.post(this.baseUrl + url, data, { headers: this.headerBase }).map((rspd: any) => {
      if (rspd.Code === 500) {
        this.onBackendError(rspd.Message);
      }
      return rspd.Data;
    });
  }

  // put方式发起请求
  protected putData(url: string, data: object): Observable<object> {
    return this.http.put(this.baseUrl + url, data, { headers: this.headerBase }).map((rspd: any) => {
      if (rspd.Code === 500) {
        this.onBackendError(rspd.Message);
      }
      return rspd.Data;
    });
  }

  // 通用错误处理
  protected onBackendError(errMsg: string): void {
    this.notification.create("error", "错误", errMsg);
  }

  // 通用成功处理
  protected onSucceed(): void {
    // todo
  }

  // 附加时间戳
  private appendTimeStamp(url: string): string {
    if (url.includes("?")) {
      return url + "&t=" + new Date().getTime().toString();
    } else {
      return url + "?t=" + new Date().getTime().toString();
    }
  }
}
