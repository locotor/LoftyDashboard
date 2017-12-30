
import { Injectable } from "@angular/core";
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { Observable } from "rxjs/Observable";
import { RoomManagementService } from "./roomManagement.service";

@Injectable()
export class RoomManagementResolver implements Resolve<any> {
    constructor(private _apiService: RoomManagementService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._apiService.GetDistrictsAndRoomConfigs().take(1).map(rspd => {
            if (rspd) {
                return rspd;
            } else { // id not found
                this.router.navigate(["/message"]);
                return null;
            }
        });
    }
}