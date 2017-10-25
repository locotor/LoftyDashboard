import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "../../root/web-base.service";
import Message from "../../models/message/message.model";


@Injectable()
export class ChatService extends WebBaseService {

    constructor(private http: HttpClient) { super() }

    // 获取历史聊天人员
    public GetLastChatUsers(pageInde: number, pageSize: number) {
        let url = 'Account/GetLastChatUsers';
        let params = new HttpParams();
        params = params
            .append("pageInde", pageInde.toString())
            .append("pageSize", pageSize.toString());
        url = this.appendTimeStamp(url);
        let resp = this.http.get(url, { params: params })
        return resp;
    };

    // 保存聊天记录(收到消息后需要保存)：
    public SaveChatMessage(sender: number, msg: string, targetId: number) {
        let url = 'Account/SaveChatMessage';
        let params = new HttpParams();
        params = params
            .append("sender", sender.toString())
            .append("msg", msg.toString())
            .append("targetId", targetId.toString());
        url = this.appendTimeStamp(url);
        let resp = this.http.get(url, { params: params })
        return resp;
    };

    // 获取单个聊天详情
    public getChatDetail(targetId: number, pageInde: number, pageSize: number) {
        let url = "Account/GetChatMessage";
        let params = new HttpParams();
        params = params
            .append("targetId", targetId.toString())
            .append("pageInde", pageInde.toString())
            .append("pageSize", pageSize.toString());
        url = this.appendTimeStamp(url);
        let resp = this.http.get(url, { params: params })
        return resp;
    }
}