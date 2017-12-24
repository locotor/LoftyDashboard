import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Room } from "models/room/room.model";
import { RoomManagementService } from "./roomManagement.service";
import { FileUploader } from "ng2-file-upload";

const URL: string = "/Public/UploadFile";

@Component({
  templateUrl: "./roomManagement.component.html",
  styleUrls: ["./roomManagement.component.scss"]
})
export class RoomManagementComponent implements OnInit {
  constructor(
    private _roomService: RoomManagementService) {
  }

  /*--- properties---*/
  vm = {
    tableLoading: true,
    isFormVisible: false,
    isDialogConfirmLoading: false,
    pattern: "add",
    roomTypes: [
      { name: "全部", value: "" },
      { name: "民宿", value: "1" },
      { name: "别墅", value: "2" },
      { name: "酒店", value: "3" }
    ]
  };
  filterForm = {
    text: "",
    roomType: ""
  };
  roomForm: Room = new Room();
  dataSet: Room[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };
  infoImgUploader: FileUploader = new FileUploader({ url: URL });
  detailImgUploader: FileUploader = new FileUploader({ url: URL });
  bannerImgsUploader: FileUploader = new FileUploader({ url: URL });

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
    this._roomService.getRoomList(
      this.tablePagination.pageIndex,
      this.tablePagination.pageSize,
      this.filterForm.text,
      this.filterForm.roomType
    ).subscribe((rspd: any) => {
      this.vm.tableLoading = false;
      this.dataSet = rspd.Item1;
      this.tablePagination.total = rspd.Item2;
    });
  }

  openAddDialog (): void {
    this.vm.isFormVisible = true;
    this.vm.pattern = "add";
    this.roomForm = new Room();
  }

  handleEditClick (data: Room): void {
    this.vm.isFormVisible = true;
    this.vm.pattern = "edit";
    this.roomForm = data;
  }

  handleFormSubmit (): void {
    let data: Room = this.roomForm;
    if (this.vm.pattern === "add") {
      this._roomService.createRoom(data).subscribe(rspd => {
        console.log(rspd);
      });
    } else if (this.vm.pattern === "edit") {
      this._roomService.updateRoom(data).subscribe(rspd => {
        console.log(rspd);
      });
    }
  }

  ngOnInit (): void {
    this.refreshData();
  }
}
