import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "../../commons/base/web-base.service";
import Message from "../../models/message/message.model";


@Injectable()
export class MessageService extends WebBaseService {

    constructor(protected http: HttpClient) { super(http); }

    // 获取留言
    public getMessageList(status: number, type: number, pageIndex: number, pageSize: number): Observable<object> {
        let url: string = "/Message/GetMessage",
            httpParam: object = {
                status: status,
                type: type,
                pageInde: pageIndex,
                pageSize: pageSize,
            };
        return this.getData(url, httpParam);
    }

    // 阅读留言
    public scanMessage(id: number): Observable<Object> {
        let url: string = "/Message/ScanMessage";
        return this.postData(url, { id: id, });
    }

    // 回复邮件
    public sendEmail(subject: string, MessageId: number, MessageBody: string, to: string): Observable<object> {
        let url: string = "/Public/SendEmail";
        return this.postData(url, {
            subject: subject,
            MessageBody: MessageBody,
            to: to
        });
    }

    // 回复短信
    public sendSMS(MessageId: number, number: string, name: string): Observable<object> {
        let url: string = "/Public/SendPhoneMessage";
        return this.postData(url, {
            number: number,
            name: name,
        });
    }
}