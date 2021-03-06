import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { NzNotificationService } from "ng-zorro-antd";
import { WebBaseService } from "commons/base/web-base.service";
import { Room } from "models/room/room.model";

@Injectable()
export class RoomManagementService extends WebBaseService {

    constructor(
        protected http: HttpClient,
        protected notification: NzNotificationService) {
        super(http, notification);
    }

    /** 获取房间列表
     * @param {number} pageIndex 当前页
     * @param {number} pageSize 每页数据条数
     * @param {String} [text] 房间名或地点，支持“+”分割
     * @param {String} [roomType] 房间类型
     * @returns {Observable<object>} 返回
     */
    getRoomList (
        pageIndex: number,
        pageSize: number,
        text?: String,
        roomType?: String): Observable<object> {
        let url: string = "/Room/GetRoomDataList",
            httpParam: object = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                text: text,
                roomType: roomType
            };
        return this.getData(url, httpParam);
    }

    /**
     * 获取房间详情
     * @param id 房间ID
     */
    getRoomDetail (id: Number): Observable<object> {
        let url: string = "/Room/GetRoomDetailData",
            httpParam: object = {
                id: id
            };
        return this.getData(url, httpParam);
    }

    /**
     * 获取房间配置项信息
     */
    GetDistrictsAndRoomConfigs (): Observable<object> {
        let url: string = "/Room/GetDistrictsAndRoomConfigs";
        return this.getData(url, {});
    }

    getRoomConfigs (): Observable<object> {
        let url: string = "/Room/GetRoomConfigs";
        return this.getData(url, {});
    }

    getDistricts (): Observable<object> {
        let url: string = "/Room/GetDistricts";
        return this.getData(url, {});
    }

    createRoom (room: Room): Observable<object> {
        let url: string = "/Room/CreateRoom";
        return this.postData(url, room);
    }

    updateRoom (room: Room): Observable<object> {
        let url: string = "/Room/UpdateRoom";
        return this.postData(url, room);
    }

    deleteRoom (id: number): Observable<object> {
        let url: string = "/Room/DeleteRoom";
        return this.postData(url, { id: id });
    }
}
