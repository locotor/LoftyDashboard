import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "../commons/base/web-base.service";
import User from "../models/user/user.model";


@Injectable()
export class UserService extends WebBaseService {

    constructor(protected http: HttpClient) { super(http); }

    public currentAdmin: User;

    // 获取用户信息
    public GetUserInfoById (uid: number): Observable<Object> {
        let url: string = "/Account/GetUserInfoById";
        return this.getData(url, { uid: uid });
    }

    // 修改用户信息
    public ChangeInfo (
        userId: number,
        account: string,
        name?: string,
        passWord?: string,
        type?: number,
        email?: string,
        headImageUrl?: string,
        phoneNumber?: string): Observable<Object> {
        let url: string = "/Account/ChangeInfo";
        return this.putData(url, {
            userId: userId,
            account: account,
            name: name,
            passWord: passWord,
            type: type,
            email: email,
            headImageUrl: headImageUrl,
            phoneNumber: phoneNumber
        });
    }
}