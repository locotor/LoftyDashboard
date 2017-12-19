import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "../../commons/base/web-base.service";

@Injectable()
export class RoomManagementService extends WebBaseService {

    constructor(protected http: HttpClient) { super(http); }

    // 获取房间列表
    public getMessageList (pageIndex: number, pageSize: number): Observable<object> {
        let url: string = "/Room/SearchRoom",
            httpParam: object = {
                pageInde: pageIndex,
                pageSize: pageSize,
            };
        return this.getData(url, httpParam);
    }
}