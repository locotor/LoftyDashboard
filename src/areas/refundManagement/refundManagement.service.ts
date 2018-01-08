import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { NzNotificationService } from "ng-zorro-antd";
import { WebBaseService } from "commons/base/web-base.service";
import { Room } from "models/room/room.model";

@Injectable()
export class RefundManagementService extends WebBaseService {

    constructor(
        protected http: HttpClient,
        protected notification: NzNotificationService) {
        super(http, notification);
    }

    /**
     * 获取退款申请列表
     * @param pageIndex 当前页
     * @param pageSize 每页数量
     * @param status 申请状态：1、未处理 2、同意、3、拒绝
     * @param orderId 订单号
     * @param phone 手机号
     * @param applyUserAccount 申请用户帐号
     */
    getRefundList(
        pageIndex: number,
        pageSize: number,
        status?: string,
        orderId?: string,
        phone?: string,
        applyUserAccount?: string): Observable<object> {
        let url: string = "/Apply/GetRefundApplys",
            httpParam: object = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                status: status,
                orderId: orderId,
                phone: phone,
                applyUserAccount: applyUserAccount
            };
        return this.getData(url, httpParam);
    }

    /**
     * 同意支付宝退款
     * @param orderId 订单号
     */
    passAlipayRefund(orderId: string): Observable<object> {
        let url: string = "/Public/AlipayRefundPass",
            httpParam: object = {
                orderId: orderId
            };
        return this.getData(url, httpParam);
    }

    /**
     * 拒绝支付宝退款
     * @param orderId 订单号
     */
    refuseAlipayRefund(orderId: string): Observable<object> {
        let url: string = "/Public/AlipayRefundRefuse",
            httpParam: object = {
                orderId: orderId
            };
        return this.getData(url, httpParam);
    }

}
