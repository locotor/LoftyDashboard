import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebBaseService {
  constructor() { }

  protected headerBase = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })

  //获取当前用户信息
  protected GetUserData() { }

  //通用错误处理
  protected OnError(error) {
    let errMsg: string;
    let url: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''}`
      url = error.url;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(`请求路径: ${url} 错误: `, errMsg);
  }

  //通用成功处理
  protected OnSucceed() { }

  //附加时间戳
  protected appendTimeStamp(url: string) {
    if (url.includes('?')) {
      return url + "&t=" + new Date().getTime().toString();
    } else {
      return url + "?t=" + new Date().getTime().toString();
    }
  }
}
