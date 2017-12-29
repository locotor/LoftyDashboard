import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";
import { Room } from "models/room/room.model";
import { RoomManagementService } from "./roomManagement.service";
import { FileUploader, FileSelectDirective, FileItem } from "ng2-file-upload";

const URL: string = "/Public/UploadFile";
class UploadFile {
  name: string;
  url: string;
  isReady: boolean;
  isUploading: boolean;
  isUploaded: boolean;
  isSuccess: boolean;
  isError: boolean;
}

@Component({
  templateUrl: "./roomManagement.component.html",
  styleUrls: ["./roomManagement.component.scss"]
})
export class RoomManagementComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
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
    districts: [],
    configs: []
  };
  filterForm = {
    text: "",
    roomType: ""
  };
  roomFormData: Room = new Room();
  roomValidateForm: FormGroup;
  dataSet: Room[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };
  descriptionImgUploader: FileUploader = new FileUploader({ url: URL });
  descriptionImgList: UploadFile[] = [];
  infoImgUploader: FileUploader = new FileUploader({ url: URL });
  infoImgList: UploadFile[] = [];
  bannerImgsUploader: FileUploader = new FileUploader({ url: URL });
  bannerImgList: UploadFile[] = [];

  ngOnInit(): void {
    this.refreshData();
    // 上传器事件绑定
    this.descriptionImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "descriptionImg");
    };
    this.infoImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "infoImg");
    };
    this.bannerImgsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "bannerImg");
    };
    // 表单验证规则
    this.roomValidateForm = new FormGroup({
      RoomName: new FormControl("", [Validators.required]),
      Price: new FormControl("", [Validators.required]),
      RoomCount: new FormControl("", [Validators.required]),
      DistrictId: new FormControl(1, [Validators.required]),
      Configs: new FormControl([], [Validators.required]),
      Longitude: new FormControl(0, [Validators.required]),
      Latitude: new FormControl(0, [Validators.required]),
      BedCount: new FormControl(null, [Validators.required]),
      AdultCount: new FormControl(null, [Validators.required]),
      ChildCount: new FormControl(null, [Validators.required]),
      Area: new FormControl(null, [Validators.required]),
      RoomTypeValue: new FormControl(null, [Validators.required]),
      IsBargainPrice: new FormControl(false, [Validators.required]),
      BargainPrice: new FormControl(null),
      Introduction: new FormControl(null),
      Address: new FormControl(null)
    });
  }

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
    if (this.vm.configs.length && this.vm.districts.length) { // 已经获取过配置对象列表
      this.vm.configs.forEach((item: any) => {
        item.checked = false;
      });
      this.vm.isFormVisible = true;
      this.vm.pattern = "add";
      this.roomValidateForm.reset();
    } else { // 尚未获取过配置对象列表
      this._roomService.GetDistrictsAndRoomConfigs().subscribe((rspd: any) => {
        this.vm.configs = rspd.RoomConfig.map(item => {
          return {
            label: item.Remark,
            value: item.Id,
            checked: false
          };
        });
        this.vm.districts = rspd.District;
        this.vm.isFormVisible = true;
        this.vm.pattern = "add";
        this.roomValidateForm.reset();
      });
    }
  }

  /**
   * 打开房间编辑界面
   * @param data 房间对象
   */
  handleEditClick(data: Room): void {
    if (this.vm.configs.length && this.vm.districts.length) { // 已经获取过配置对象列表
      this.vm.configs.forEach((item: any) => {
        item.checked = data.ConfigString ? data.ConfigString.includes(item.value) : false;
      });
      this.vm.isFormVisible = true;
      this.vm.pattern = "edit";
      this.roomValidateForm.setValue({
        RoomName: data.RoomName,
        Price: data.Price,
        RoomCount: data.RoomCount,
        Longitude: data.Longitude,
        Latitude: data.Latitude,
        Address: data.Address,
        BedCount: data.BedCount,
        AdultCount: data.AdultCount,
        ChildCount: data.ChildCount,
        Area: data.Area,
        DistrictId: data.DistrictId,
        RoomTypeValue: data.RoomTypeValue,
        IsBargainPrice: data.IsBargainPrice,
        BargainPrice: data.BargainPrice,
        Introduction: data.Introduction,
        Configs: this.vm.configs
      });
      this.descriptionImgList = this.roomFormData.DescriptionPic ? [{
        name: this.roomFormData.DescriptionPic.split("/").pop(),
        url: this.roomFormData.DescriptionPic,
        isError: false,
        isReady: true,
        isSuccess: true,
        isUploaded: true,
        isUploading: false
      }] : [];
      this.infoImgList = this.roomFormData.RoomInfoPic ? [{
        name: this.roomFormData.RoomInfoPic.split("/").pop(),
        url: this.roomFormData.DescriptionPic,
        isError: false,
        isReady: true,
        isSuccess: true,
        isUploaded: true,
        isUploading: false
      }] : [];
      this.bannerImgList = this.roomFormData.Photos ? this.roomFormData.Photos.split(",").map(photo => {
        return {
          name: photo.split("/").pop(),
          url: photo,
          isError: false,
          isReady: true,
          isSuccess: true,
          isUploaded: true,
          isUploading: false
        };
      }) : [];
    } else { // 尚未获取过配置对象列表
      this._roomService.GetDistrictsAndRoomConfigs().subscribe((rspd: any) => {
        this.vm.configs = rspd.RoomConfig.map(item => {
          return {
            label: item.Remark,
            value: item.Id,
            checked: data.ConfigString ? data.ConfigString.includes(item.value) : false
          };
        });
        this.vm.districts = rspd.District;
        this.vm.isFormVisible = true;
        this.vm.pattern = "edit";
        this.roomValidateForm.setValue({
          RoomName: data.RoomName,
          Price: data.Price,
          RoomCount: data.RoomCount,
          Longitude: data.Longitude,
          Latitude: data.Latitude,
          Address: data.Address,
          BedCount: data.BedCount,
          AdultCount: data.AdultCount,
          ChildCount: data.ChildCount,
          Area: data.Area,
          DistrictId: data.DistrictId,
          RoomTypeValue: data.RoomTypeValue,
          IsBargainPrice: data.IsBargainPrice,
          BargainPrice: data.BargainPrice,
          Introduction: data.Introduction,
          Configs: this.vm.configs
        });
        this.descriptionImgList = this.roomFormData.DescriptionPic ? [{
          name: this.roomFormData.DescriptionPic.split("/").pop(),
          url: this.roomFormData.DescriptionPic,
          isError: false,
          isReady: true,
          isSuccess: true,
          isUploaded: true,
          isUploading: false
        }] : [];
        this.infoImgList = this.roomFormData.RoomInfoPic ? [{
          name: this.roomFormData.RoomInfoPic.split("/").pop(),
          url: this.roomFormData.DescriptionPic,
          isError: false,
          isReady: true,
          isSuccess: true,
          isUploaded: true,
          isUploading: false
        }] : [];
        this.bannerImgList = this.roomFormData.Photos ? this.roomFormData.Photos.split(",").map(photo => {
          return {
            name: photo.split("/").pop(),
            url: photo,
            isError: false,
            isReady: true,
            isSuccess: true,
            isUploaded: true,
            isUploading: false
          };
        }) : [];
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

  handleFormSubmit(): void {
    let data: Room = this.roomFormData;
    let configs: string[] = [];
    this.vm.configs.forEach(item => {
      if (item.checked) {
        configs.push(item.value);
      }
    });
    data.ConfigString = configs.join(",");
    data.DescriptionPic = this.descriptionImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.RoomInfoPic = this.infoImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.Photos = this.bannerImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    if (this.vm.pattern === "add") {
      this._roomService.createRoom(data).subscribe(rspd => {
        if (rspd) {
          this.vm.isFormVisible = false;
          this.roomFormData = null;
          this._message.create("success", "新增房间信息成功！");
          this.refreshData();
        }
      });
    } else if (this.vm.pattern === "edit") {
      this._roomService.updateRoom(data).subscribe((rspd: any) => {
        if (rspd) {
          this.vm.isFormVisible = false;
          this.roomFormData = null;
          this._message.create("success", "修改房间信息成功！");
          this.refreshData();
        }
      });
    }
  }

  uploadImg(imgFile: UploadFile, loader: string): void {
    let uploader: FileUploader = this[loader];
    let file: FileItem = uploader.queue.find(file => file.file.name === imgFile.name);
    file.upload();
  }

  handleFileSelected(uploaderName: string): void {
    let uploader: FileUploader = this[uploaderName],
      imglist: UploadFile[];
    switch (uploaderName) {
      case "descriptionImgUploader":
        if (uploader.queue.length > 1) {
          uploader.queue[0].remove();
        }
        imglist = this.descriptionImgList;
        imglist.splice(0, imglist.length);
        imglist.push({
          name: uploader.queue[0].file.name,
          url: "",
          isReady: false,
          isUploading: false,
          isSuccess: false,
          isError: false,
          isUploaded: false
        });
        break;
      case "infoImgUploader":
        if (uploader.queue.length > 1) {
          uploader.queue[0].remove();
        }
        imglist = this.infoImgList;
        imglist.splice(0, imglist.length);
        imglist.push({
          name: uploader.queue[0].file.name,
          url: "",
          isReady: false,
          isUploading: false,
          isSuccess: false,
          isError: false,
          isUploaded: false
        });
        break;
      case "bannerImgsUploader":
        let index: number = uploader.queue.length - 1;
        imglist.push({
          name: uploader.queue[index].file.name,
          url: "",
          isReady: false,
          isUploading: false,
          isSuccess: false,
          isError: false,
          isUploaded: false
        });
    }

  }

  removeImg(imgFile: UploadFile, type: string): void {
    let imglist: UploadFile[];
    switch (type) {
      case "descriptionImg":
        imglist = this.descriptionImgList;
        break;
      case "infoImg":
        imglist = this.infoImgList;
        break;
      case "bannerImg":
        imglist = this.bannerImgList;
        break;
    }
    imglist.splice(imglist.findIndex(img => img.name === imgFile.name), 1);
  }

  handleFileUploaded(item: any, response: any, status: any, headers: any, type: string): void {
    let imglist: UploadFile[];
    switch (type) {
      case "descriptionImg":
        imglist = this.descriptionImgList;
        break;
      case "infoImg":
        imglist = this.infoImgList;
        break;
      case "bannerImg":
        imglist = this.bannerImgList;
        break;
    }
    let img: UploadFile = imglist.find(img => img.name === item.file.name);
    img.url = response;
    img.isReady = true;
    img.isSuccess = true;
    img.isUploaded = true;
  }

  getFormControl(name: string): AbstractControl {
    return this.roomValidateForm.controls[name];
  }

}
