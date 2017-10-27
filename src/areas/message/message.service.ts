import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "../../commons/base/web-base.service";
import Message from "../../models/message/message.model";


@Injectable()
export class MessageService extends WebBaseService {

    constructor(private http: HttpClient) { super(); }

    // 获取留言
    public getMessageList (status: number, type: number, pageInde: number, pageSize: number): Observable<object> {
        this.url = "/Message/GetMessage";
        this.httpParam = new HttpParams();
        this.httpParam = this.httpParam.append("status", status.toString())
            .append("type", type.toString())
            .append("pageInde", pageInde.toString())
            .append("pageSize", pageSize.toString());
        this.url = this.appendTimeStamp(this.url);
        return this.http.get(this.url, { params: this.httpParam });
    }

    // 查看留言
    public scanMessage (id: number): Observable<Object> {
        let url: string = "/Message/ScanMessage";
        url = this.appendTimeStamp(url);
        return this.http.put(url, { id: id, }, { headers: this.headerBase });
    }

    // 发送邮件
    public sendEmail (subject: string, MessageBody: string, to: string): Observable<object> {
        let url: string = "/Public/SendEmail";
        url = this.appendTimeStamp(url);
        return this.http.post(url, {
            subject: subject,
            MessageBody: MessageBody,
            to: to
        }, { headers: this.headerBase });
    }

    // 发送短信
    public sendSMS (number: string, name: string): Observable<object> {
        let url: string = "/Public/SendPhoneMessage";
        url = this.appendTimeStamp(url);
        return this.http.post(url, {
            number: number,
            name: name,
        }, { headers: this.headerBase });
    }
}