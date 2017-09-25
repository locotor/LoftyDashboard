import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "../../root/web-base.service";
import Message from "../../models/message/message.model";


@Injectable()
export class MessageService extends WebBaseService {

    constructor(private http: HttpClient) { super() }

    // 获取留言
    public getMessageList(status: number, type: number, pageInde: number, pageSize: number) {
        let url = '/Message/GetMessage';
        let params = new HttpParams();
        params = params.append("status", status.toString())
            .append("type", type.toString())
            .append("pageInde", pageInde.toString())
            .append("pageSize", pageSize.toString());
        url = this.appendTimeStamp(url);
        let resp = this.http.get(url, { params: params })
        return resp;
    }

    // 查看留言
    public scanMessage(id: number) {
        let url = '/Message/ScanMessage';
        url = this.appendTimeStamp(url);
        let resp = this.http.put(url, { id: id, }, { headers: this.headerBase })
        return resp;
    }

    // 发送邮件
    public sendEmail(subject: string, MessageBody: string, to: string) {
        let url = '/Public/SendEmail';
        url = this.appendTimeStamp(url);
        let resp = this.http.post(url, {
            subject: subject,
            MessageBody: MessageBody,
            to: to
        }, { headers: this.headerBase })
        return resp;
    }

    // 发送短信
    public sendSMS(number: string, name: string) {
        let url = '/Public/SendPhoneMessage';
        url = this.appendTimeStamp(url);
        let resp = this.http.post(url, {
            number: number,
            name: name,
        }, { headers: this.headerBase })
        return resp;
    }
}