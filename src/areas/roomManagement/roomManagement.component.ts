import { Component, OnInit } from "@angular/core";
import { RoomManagementService } from "./roomManagement.service";

@Component({
  templateUrl: "./roomManagement.component.html",
  styleUrls: ["./roomManagement.component.scss"]
})
export class RoomManagementComponent implements OnInit {
  constructor(private _roomService: RoomManagementService) {
  }
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;
  _filterGender = [
    { name: "male", value: false },
    { name: "female", value: false }
  ];

  reset(): void {
    this._filterGender.forEach(item => {
      item.value = false;
    });
    this.refreshData(true);
  }


  refreshData(reset: boolean = false): void {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
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
