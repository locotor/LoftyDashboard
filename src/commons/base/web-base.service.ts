import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class WebBaseService {
  constructor(http: HttpClient) {
    this.http = http;
  }
  protected http: HttpClient;
  protected baseUrl: string = "localhost:3001";
  protected httpParam: HttpParams;
  protected headerBase = new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8"
  });

  // get方式发起请求
  protected getData (url: string, data: object): Observable<object> {
    this.httpParam = new HttpParams();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this.httpParam = this.httpParam.append(key, data[key].toString());
      }
    }
    url = this.appendTimeStamp(url);
    return this.http.get(this.baseUrl + url, { params: this.httpParam });
  }

  // post方式发起请求
  protected postData (url: string, data: object): Observable<object> {
    url = this.appendTimeStamp(url);
    return this.http.post(this.baseUrl + url, data, { headers: this.headerBase });
  }

  // put方式发起请求
  protected putData (url: string, data: object): Observable<object> {
    url = this.appendTimeStamp(url);
    return this.http.put(this.baseUrl + url, data, { headers: this.headerBase });
  }

  // 通用错误处理
  protected onError (error: any): void {
    let errMsg: string;
    let url: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ""}`
      url = error.url;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(`请求路径: ${url} 错误: `, errMsg);
  }

  // 通用成功处理
  protected onSucceed (): void {
    // todo
  }

  // 附加时间戳
  private appendTimeStamp (url: string): string {
    if (url.includes("?")) {
      return url + "&t=" + new Date().getTime().toString();
    } else {
      return url + "?t=" + new Date().getTime().toString();
    }
  }
}
