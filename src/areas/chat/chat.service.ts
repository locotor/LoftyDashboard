import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "commons/base/web-base.service";
import Message from "models/message/message.model";


@Injectable()
export class ChatService extends WebBaseService implements OnInit {
    private _singlrService: any;
    constructor(protected http: HttpClient) {
        super(http);
        let jQuery: any = $;
        this._singlrService = jQuery.connection.LoftyHub;
    }

    ngOnInit (): void {
        this._singlrService.connection.start();
        this._singlrService.client.ReceiveChatMessage = (detail: any) => {
            console.log(JSON.parse(detail).MessageBody);
            // 收到消息后需要保存
            // this.SaveChatMessage()
        };
    }

    // 获取历史聊天人员
    public GetLastChatUsers (pageInde: number, pageSize: number): Observable<Object> {
        let url: string = "Account/GetLastChatUsers";
        return this.getData(url, {
            pageInde: pageInde,
            pageSize: pageSize
        });
    }

    // 保存聊天记录(收到消息后需要保存)：
    public SaveChatMessage (sender: number, msg: string, targetId: number): Observable<Object> {
        let url: string = "Account/SaveChatMessage";
        return this.getData(url, {
            sender: sender,
            msg: msg,
            targetId: targetId
        });
    }

    // 获取单个聊天详情
    public getChatDetail (targetId: number, pageInde: number, pageSize: number): Observable<Object> {
        let url: string = "Account/GetChatMessage";
        return this.getData(url, {
            targetId: targetId,
            pageInde: pageInde,
            pageSize: pageSize
        });
    }

    // 发送聊天内容
    public sendChat (msg: string, userId: string): void {
        this._singlrService.server.sendMessage(msg, userId, "");
    }
}