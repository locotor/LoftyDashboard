import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { Subject } from "rxjs/Subject";
import { NzNotificationService } from "ng-zorro-antd";
import { WebBaseService } from "commons/base/web-base.service";
import { AppContextService } from "commons/utilities/app-context.service";
import { ChatMessage } from "models/chat/chat.message.model";


@Injectable()
export class ChatService extends WebBaseService implements OnInit {
    private _singlrService: any;
    private _receiveChatMessageSource = new Subject<ChatMessage>();
    public receiveChatMessageSource = this._receiveChatMessageSource.asObservable();

    constructor(
        protected http: HttpClient,
        private _appContext: AppContextService,
        protected notification: NzNotificationService) {
        super(http, notification);
    }

    ngOnInit(): void {
        this._appContext.singlrService.client.ReceiveChatMessage = (detail: any) => {
            console.log(JSON.parse(detail).MessageBody);
            // 收到消息后需要保存
            // this.SaveChatMessage()
            this._receiveChatMessageSource.next(detail);
        };
    }
    // 保存聊天记录(收到消息后需要保存)：
    public SaveChatMessage(sender: number, msg: string, targetId: number): Observable<Object> {
        let url: string = "/Message/SaveChatMessage";
        return this.getData(url, {
            sender: sender,
            msg: msg,
            targetId: targetId
        });
    }

    // 获取历史聊天人员
    public GetLastChatUsers(pageIndex: number, pageSize: number): Observable<Object> {
        let url: string = "/Account/GetLastChatUsers";
        return this.getData(url, {
            pageIndex: pageIndex,
            pageSize: pageSize
        });
    }

    // 获取单个聊天详情
    public getChatDetail(targetId: number, pageIndex: number, pageSize: number): Observable<Object> {
        let url: string = "/Account/GetChatMessage";
        return this.getData(url, {
            targetId: targetId,
            pageIndex: pageIndex,
            pageSize: pageSize
        });
    }

    // 发送聊天内容
    public sendChat(msg: string, userId: string): void {
        this._singlrService.server.sendMessage(msg, userId, "");
    }
}