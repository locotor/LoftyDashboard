import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { WebBaseService } from "commons/base/web-base.service";
import { Order } from "models/order/order.model";

@Injectable()
export class OrderManagementService extends WebBaseService {

    constructor(protected http: HttpClient) { super(http); }

    createOrder(order: Order): Observable<object> {
        let url: string = "/Order/CreateOrder";
        return this.postData(url, order);
    }

    updateOrder(room: Order): Observable<object> {
        let url: string = "/Order/UpdateOrder";
        return this.postData(url, room);
    }

    getOrderList(
        pageIndex: number,
        pageSize: number,
        orderId?: String,
        roomId?: String): Observable<object> {
        let url: string = "/Order/GetAllOrder";
        return this.getData(url, {
            pageIndex: pageIndex,
            pageSize: pageSize,
            orderId: orderId,
            roomId: roomId
        });
    }

    roomAutoComplete(key: string): Observable<object> {
        let url: string = "/Room/AutoCompleteFullInfo";
        return this.getData(url, { key: key });
    }
}