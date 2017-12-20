import { Component, OnInit } from "@angular/core";
import { RoomManagementService } from "./roomManagement.service";

@Component({
  templateUrl: "./roomManagement.component.html",
  styleUrls: ["./roomManagement.component.scss"]
})
export class RoomManagementComponent implements OnInit {
  constructor(private _roomService: RoomManagementService) {
  }
  vm = {
    tableLoading:true
  };
  searchParam = {
    filterType : [
      { name: "民宿", value: "1" },
      { name: "别墅", value: "2" },
      { name: "酒店", value: "3" }
    ]
  };
  roomTable = {
    dataSet: [],
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };

  reset(): void {
    // this.roomTable.filterType.forEach(item => {
    //   item.value = false;
    // });
    this.refreshData(true);
  }


  refreshData(reset: boolean = false): void {
    if (reset) {
      this.roomTable.pageIndex = 1;
    }
    this.vm.tableLoading = true;
    // const selectedGender = this._filterGender.filter(item => item.value).map(item => item.name);
    // this._roomService.getMessageList(this._current, this._pageSize, "name", this._sortValue, selectedGender).subscribe((data: any) => {
    //   this._loading = false;
    //   this._total = 200;
    //   this._dataSet = data.results;
    // })
  }

  ngOnInit(): void {
    this.refreshData();
  }
}
