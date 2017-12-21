import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Room } from "models/room/room.model";
import { RoomManagementService } from "./roomManagement.service";

@Component({
  templateUrl: "./roomManagement.component.html",
  styleUrls: ["./roomManagement.component.scss"]
})
export class RoomManagementComponent implements OnInit {
  constructor(
    private _roomService: RoomManagementService,
    private _formBuilder: FormBuilder) {
  }

  /*--- properties---*/
  vm = {
    tableLoading: true,
    roomType: [
      { name: "民宿", value: "1" },
      { name: "别墅", value: "2" },
      { name: "酒店", value: "3" }
    ]
  };
  filterForm: any = {};
  dataSet: Room[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };

  /**
   * 重置表单数据
   */
  reset (): void {
    this.refreshData(true);
  }

  /**
   * 刷新数据
   * @param reset 是否重置表单数据
   */
  refreshData (reset: boolean = false): void {
    if (reset) {
      this.tablePagination.pageIndex = 1;
    }
    this.vm.tableLoading = true;
    this._roomService
      .getMessageList(this.tablePagination.pageIndex, this.tablePagination.pageSize)
      .subscribe((rspd: any) => {
        this.vm.tableLoading = false;
        this.dataSet = rspd.Item1;
        this.tablePagination.total = rspd.Item2;
      });
  }

  ngOnInit (): void {
    this.refreshData();
  }
}
