import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "../../commons/base/web-base.service";
import Message from "../../models/message/message.model";


@Injectable()
export class ChatService extends WebBaseService {

    constructor(private http: HttpClient) { super(); }

    // 获取历史聊天人员
    public GetLastChatUsers (pageInde: number, pageSize: number): Observable<Object> {
        let url: string = "Account/GetLastChatUsers";
        let params: HttpParams = new HttpParams();
        params = params
            .append("pageInde", pageInde.toString())
            .append("pageSize", pageSize.toString());
        url = this.appendTimeStamp(url);
        return this.http.get(url, { params: params });
    }

    // 保存聊天记录(收到消息后需要保存)：
    public SaveChatMessage (sender: number, msg: string, targetId: number): Observable<Object> {
        let url: string = "Account/SaveChatMessage";
        let params: HttpParams = new HttpParams();
        params = params
            .append("sender", sender.toString())
            .append("msg", msg.toString())
            .append("targetId", targetId.toString());
        url = this.appendTimeStamp(url);
        return this.http.get(url, { params: params });
    }

    // 获取单个聊天详情
    public getChatDetail (targetId: number, pageInde: number, pageSize: number): Observable<Object> {
        let url: string = "Account/GetChatMessage";
        let params: HttpParams = new HttpParams();
        params = params
            .append("targetId", targetId.toString())
            .append("pageInde", pageInde.toString())
            .append("pageSize", pageSize.toString());
        url = this.appendTimeStamp(url);
        return this.http.get(url, { params: params });
    }
}