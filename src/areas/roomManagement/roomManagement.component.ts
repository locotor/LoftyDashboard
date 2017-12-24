import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";
import { Room } from "models/room/room.model";
import { RoomManagementService } from "./roomManagement.service";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";

const URL: string = "/Public/UploadFile";

@Component({
  templateUrl: "./roomManagement.component.html",
  styleUrls: ["./roomManagement.component.scss"]
})
export class RoomManagementComponent implements OnInit {
  constructor(
    private _roomService: RoomManagementService,
    private _message: NzMessageService) {
  }

  /*--- properties---*/
  vm = {
    tableLoading: true,
    isFormVisible: false,
    isDialogConfirmLoading: false,
    pattern: "add",
    roomTypes: [
      { name: "民宿", value: 1 },
      { name: "别墅", value: 2 },
      { name: "酒店", value: 3 }
    ],
    districts: [
      { name: "芭东", value: 1 },
      { name: "苏林", value: 2 },
      { name: "卡马拉", value: 3 },
      { name: "卡图", value: 4 },
      { name: "卡塔", value: 5 },
      { name: "威七", value: 6 },
      { name: "邦涛", value: 7 },
      { name: "塔朗", value: 8 },
      { name: "拉崴", value: 9 },
      { name: "迈考", value: 10 },
      { name: "拉古娜", value: 11 },
      { name: "芭东码头酒店", value: 12 },
      { name: "皇家王子公寓", value: 13 },
      { name: "埃里克森宾馆", value: 14 },
    ],
    configs: []
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
  reset(): void {
    this.refreshData(true);
  }

  /**
   * 刷新数据
   * @param reset 是否重置表单数据
   */
  refreshData(reset: boolean = false): void {
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

  /**
   * 打开房间新建列表
   */
  openAddDialog(): void {
    if (this.vm.configs.length) { // 已经获取过配置对象列表
      this.vm.configs.forEach((item: any) => {
        item.checked = false;
      });
      this.vm.isFormVisible = true;
      this.vm.pattern = "add";
      this.roomForm = new Room();
    } else { // 尚未获取过配置对象列表
      this._roomService.getRoomConfigs().subscribe(rspd => {
        this.vm.configs = (<any[]>rspd).map(item => {
          return {
            label: item.Description,
            value: item.Id,
            checked: false
          };
        });
        this.vm.isFormVisible = true;
        this.vm.pattern = "add";
        this.roomForm = new Room();
      });
    }
  }

  /**
   * 打开房间编辑界面
   * @param data 房间对象
   */
  handleEditClick(data: Room): void {
    if (this.vm.configs.length) { // 已经获取过配置对象列表
      this.vm.configs.forEach((item: any) => {
        item.checked = data.ConfigString ? data.ConfigString.includes(item.value) : false;
      });
      this.vm.isFormVisible = true;
      this.vm.pattern = "edit";
      this.roomForm = JSON.parse(JSON.stringify(data));
    } else { // 尚未获取过配置对象列表
      this._roomService.getRoomConfigs().subscribe(rspd => {
        this.vm.configs = (<any[]>rspd).map(item => {
          return {
            label: item.Description,
            value: item.Id,
            checked: item.checked = data.ConfigString ? data.ConfigString.includes(item.Id) : false
          };
        });
        this.vm.isFormVisible = true;
        this.vm.pattern = "edit";
        this.roomForm = JSON.parse(JSON.stringify(data));
      });
    }
  }

  /**
   * 删除房间信息
   * @param data 房间对象
   */
  handleDelteClick(data: Room): void {
    this._roomService.deleteRoom(data.RoomId).subscribe(rspd => {
      if (rspd) {
        this._message.create("success", "删除房间信息成功");
        this.refreshData();
      }
    });
  }

  handleFileSelected(uploaderName: string): void {
    let uploader: FileUploader = this[uploaderName];
    if (uploader.queue.length > 1) {
      uploader.queue[0].remove();
    }
  }

  handleFormSubmit(): void {
    let data: Room = this.roomForm;
    let configs: string[] = [];
    this.vm.configs.forEach(item => {
      if (item.checked) {
        configs.push(item.value);
      }
    });
    data.ConfigString = configs.join(",");
    data.District = this.vm.districts.find(district=>district.name === data.District).value.toString();
    if (this.vm.pattern === "add") {
      this._roomService.createRoom(data).subscribe(rspd => {
        if (rspd) {
          this.vm.isFormVisible = false;
          this.roomForm = null;
          this._message.create("success", "新增房间信息成功！");
          this.refreshData();
        }
      });
    } else if (this.vm.pattern === "edit") {
      this._roomService.updateRoom(data).subscribe((rspd: any) => {
        if (rspd) {
          this.vm.isFormVisible = false;
          this.roomForm = null;
          this._message.create("success", "修改房间信息成功！");
          this.refreshData();
        }
      });
    }
  }

  ngOnInit(): void {
    this.refreshData();
  }
}
