import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { RoomManagementService } from "./roomManagement.service";
import { FileUploader, FileSelectDirective, FileItem } from "ng2-file-upload";
import { Room } from "models/room/room.model";

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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private _roomService: RoomManagementService,
    private _message: NzMessageService) {
  }

  /*--- properties---*/
  vm = {
    tableLoading: true,
    isFormVisible: false,
    isPreviewVisible: false,
    isSubmitLoading: false,
    previewImgUrl: null,
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
  roomArticleData: {
    Description: string,
    RoomInfoDetail: string
  };
  roomValidateForm: FormGroup;
  currentRoomId: number;
  dataSet: Room[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };
  titleImgUploader: FileUploader = new FileUploader({ url: URL });
  titleImgList: UploadFile[] = [];
  descriptionImgUploader: FileUploader = new FileUploader({ url: URL });
  descriptionImgList: UploadFile[] = [];
  infoImgUploader: FileUploader = new FileUploader({ url: URL });
  infoImgList: UploadFile[] = [];
  bannerImgsUploader: FileUploader = new FileUploader({ url: URL });
  bannerImgList: UploadFile[] = [];

  ngOnInit (): void {
    this.refreshData();
    // 上传器事件绑定
    this.bannerImgsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "titleImg");
    };
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
    // 获取配置项和地址
    this.route.data.subscribe(resolveData => {
      this.vm.configs = resolveData.configsAndDistricts.RoomConfig.map(item => {
        return {
          label: item.Remark,
          value: item.Id,
          checked: false
        };
      });
      this.vm.districts = resolveData.configsAndDistricts.District;
    });
  }

  /*--- functions---*/

  /**
   * 重新获取表格数据
   */
  reset (): void {
    this.refreshData(true);
  }

  /**
   * 刷新数据
   * @param reset 是否重置表格数据
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

  /**
   * 打开房产新建列表
   */
  openAddDialog (): void {
    this.vm.pattern = "add";
    this.roomValidateForm.reset();
    this.roomArticleData = {
      Description: "",
      RoomInfoDetail: ""
    };
    this.vm.configs.forEach((item: any) => {
      item.checked = false;
    });
    this.getFormControl("Configs").setValue(this.vm.configs);
    this.descriptionImgList = [];
    this.infoImgList = [];
    this.bannerImgList = [];
    this.vm.isFormVisible = true;
  }

  /**
   * 打开房产编辑界面
   * @param currentRoom 房产对象
   */
  handleEditClick (currentRoom: Room): void {
    this.currentRoomId = currentRoom.RoomId;
    this.vm.configs.forEach((item: any) => {
      item.checked = currentRoom.ConfigString ? currentRoom.ConfigString.includes(item.value) : false;
    });
    this.vm.isFormVisible = true;
    this.vm.pattern = "edit";
    this.roomValidateForm.setValue({
      RoomName: currentRoom.RoomName,
      Price: currentRoom.Price,
      RoomCount: currentRoom.RoomCount,
      Longitude: currentRoom.Longitude,
      Latitude: currentRoom.Latitude,
      Address: currentRoom.Address,
      BedCount: currentRoom.BedCount,
      AdultCount: currentRoom.AdultCount,
      ChildCount: currentRoom.ChildCount,
      Area: currentRoom.Area,
      DistrictId: currentRoom.DistrictId,
      RoomTypeValue: currentRoom.RoomTypeValue,
      IsBargainPrice: currentRoom.IsBargainPrice,
      BargainPrice: currentRoom.BargainPrice,
      Introduction: currentRoom.Introduction,
      Configs: this.vm.configs
    });
    for (let cName in this.roomValidateForm.controls) {
      if (this.roomValidateForm.controls.hasOwnProperty(cName)) {
        this.roomValidateForm.controls[cName].markAsDirty();
      }
    }
    this.roomArticleData = {
      Description: currentRoom.Description,
      RoomInfoDetail: currentRoom.RoomInfoDetail
    };

    this.titleImgList = currentRoom.PicUrl ? [{
      name: currentRoom.PicUrl.split("/").pop(),
      url: currentRoom.PicUrl,
      isError: false,
      isReady: true,
      isSuccess: true,
      isUploaded: true,
      isUploading: false
    }] : [];
    this.descriptionImgList = currentRoom.DescriptionPic ? [{
      name: currentRoom.DescriptionPic.split("/").pop(),
      url: currentRoom.DescriptionPic,
      isError: false,
      isReady: true,
      isSuccess: true,
      isUploaded: true,
      isUploading: false
    }] : [];
    this.infoImgList = currentRoom.RoomInfoPic ? [{
      name: currentRoom.RoomInfoPic.split("/").pop(),
      url: currentRoom.DescriptionPic,
      isError: false,
      isReady: true,
      isSuccess: true,
      isUploaded: true,
      isUploading: false
    }] : [];
    this.bannerImgList = currentRoom.Photos ? currentRoom.Photos.split(",").map(photo => {
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
  }

  /**
   * 删除房产信息
   * @param data 房产对象
   */
  handleDelteClick (data: Room): void {
    this._roomService.deleteRoom(data.RoomId).subscribe(rspd => {
      if (rspd) {
        this._message.create("success", "删除房产信息成功");
        this.refreshData();
      }
    });
  }

  // 处理表单提交
  handleFormSubmit (): void {
    let data: any = {};
    let configs: string[] = [];
    // 组装数据
    Object.assign(data, this.roomValidateForm.value);
    data.RoomId = this.currentRoomId;
    this.vm.configs.forEach(item => {
      if (item.checked) {
        configs.push(item.value);
      }
    });
    data.ConfigString = configs.join(",");
    data.PicUrl = this.titleImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.DescriptionPic = this.descriptionImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.Description = this.roomArticleData.Description;
    data.RoomInfoPic = this.infoImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.RoomInfoDetail = this.roomArticleData.RoomInfoDetail;
    data.Photos = this.bannerImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    delete data.Configs;
    // 提交
    if (this.vm.pattern === "add") {
      this.vm.isSubmitLoading = true;
      this._roomService.createRoom(data).subscribe(rspd => {
        this.vm.isFormVisible = false;
        this.vm.isSubmitLoading = false;
        if (rspd) {
          this._message.create("success", "新增房产信息成功！");
          this.refreshData();
        } else {
          this._message.create("error", "新增房产信息失败！请联系开发人员");
        }
      });
    } else if (this.vm.pattern === "edit") {
      this.vm.isSubmitLoading = true;
      this._roomService.updateRoom(data).subscribe((rspd: any) => {
        this.vm.isFormVisible = false;
        this.vm.isSubmitLoading = false;
        if (rspd) {
          this._message.create("success", "修改房产信息成功！");
          this.refreshData();
        } else {
          this._message.create("error", "修改房产信息失败！请联系开发人员");
        }
      });
    }
  }

  handleFileSelected (uploaderName: string, input: any): void {
    let uploader: FileUploader = this[uploaderName],
      imglist: UploadFile[];
    switch (uploaderName) {
      case "titleImgUploader":
        if (uploader.queue.length > 1) {
          uploader.queue[0].remove();
        }
        imglist = this.titleImgList;
        imglist.push({
          name: uploader.queue[0].file.name,
          url: "",
          isReady: false,
          isUploading: false,
          isSuccess: false,
          isError: false,
          isUploaded: false
        });
        if (imglist.length > 1) {
          imglist.splice(0, imglist.length - 1);
        }
        break;
      case "descriptionImgUploader":
        if (uploader.queue.length > 1) {
          uploader.queue[0].remove();
        }
        imglist = this.descriptionImgList;
        imglist.push({
          name: uploader.queue[0].file.name,
          url: "",
          isReady: false,
          isUploading: false,
          isSuccess: false,
          isError: false,
          isUploaded: false
        });
        if (imglist.length > 1) {
          imglist.splice(0, imglist.length - 1);
        }
        break;
      case "infoImgUploader":
        if (uploader.queue.length > 1) {
          uploader.queue[0].remove();
        }
        imglist = this.infoImgList;
        imglist.push({
          name: uploader.queue[0].file.name,
          url: "",
          isReady: false,
          isUploading: false,
          isSuccess: false,
          isError: false,
          isUploaded: false
        });
        if (imglist.length > 1) {
          imglist.splice(0, imglist.length - 1);
        }
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
    input.value = "";
  }

  uploadImg (imgFile: UploadFile, loader: string): void {
    let uploader: FileUploader = this[loader];
    let file: FileItem = uploader.queue.find(file => file.file.name === imgFile.name);
    file.upload();
  }

  removeImg (imgFile: UploadFile, type: string): void {
    let imglist: UploadFile[];
    let uploader: FileUploader;
    switch (type) {
      case "titleImg":
        imglist = this.titleImgList;
        uploader = this.titleImgUploader;
        break;
      case "descriptionImg":
        imglist = this.descriptionImgList;
        uploader = this.descriptionImgUploader;
        break;
      case "infoImg":
        imglist = this.infoImgList;
        uploader = this.infoImgUploader;
        break;
      case "bannerImg":
        imglist = this.bannerImgList;
        uploader = this.bannerImgsUploader;
        break;
    }
    imglist.splice(imglist.findIndex(img => img.name === imgFile.name), 1);
    let file: FileItem = uploader.queue.find(item => item.file.name === imgFile.name);
    if (file) {
      file.remove();
    }
  }

  handleFileUploaded (item: any, response: any, status: any, headers: any, type: string): void {
    let imglist: UploadFile[];
    switch (type) {
      case "descriptionImg":
        imglist = this.titleImgList;
        break;
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

  // 查看图片
  showModal (item: UploadFile): void {
    this.vm.previewImgUrl = this.sanitizer.bypassSecurityTrustUrl(item.url);
    this.vm.isPreviewVisible = true;
  }

  getFormControl (name: string): AbstractControl {
    return this.roomValidateForm.controls[name];
  }

}
