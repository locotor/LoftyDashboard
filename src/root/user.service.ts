import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "./web-base.service";
import User from "../models/user/user.model";


@Injectable()
export class UserService extends WebBaseService {

    constructor(private http: HttpClient) { super() }

    public currentAdmin: User;

    // 获取用户信息
    public GetUserInfoById(uid: number): Observable<Object> {
        let url = 'Account/GetUserInfoById';
        let params = new HttpParams();
        params = params.append("uid", uid.toString())
        url = this.appendTimeStamp(url);
        let resp = this.http.get(url, { params: params })
        return resp;
    }

    // 修改用户信息
    public ChangeInfo(
        userId: number,
        account: string,
        name?: string,
        passWord?: string,
        type?: number,
        email?: string,
        headImageUrl?: string,
        phoneNumber?: string): Observable<Object> {
        let url = 'Account/ChangeInfo';
        url = this.appendTimeStamp(url);
        let resp = this.http.put(url, {
            userId: userId,
            account: account,
            name: name,
            passWord: passWord,
            type: type,
            email: email,
            headImageUrl: headImageUrl,
            phoneNumber: phoneNumber
        }, { headers: this.headerBase })
        return resp;
    }
}