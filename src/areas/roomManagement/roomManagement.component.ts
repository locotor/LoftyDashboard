import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { RoomManagementService } from "./roomManagement.service";
import { FileUploader, FileSelectDirective, FileItem } from "ng2-file-upload";
import { Room } from "models/room/room.model";
import { RoomPriceConfig } from "models/room/roomPriceConfig.model";
import { NgForm } from "@angular/forms";
import uuid from "commons/utilities/uuid";

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
  // 图片上传器
  titleImgUploader: FileUploader = new FileUploader({ url: URL });
  descriptionImgUploader: FileUploader = new FileUploader({ url: URL });
  infoImgUploader: FileUploader = new FileUploader({ url: URL });
  bannerImgsUploader: FileUploader = new FileUploader({ url: URL });

  vm = {
    tableLoading: true,
    isFormVisible: false,
    isPreviewVisible: false,
    isPriceCalenderFormVisible: false,
    isSubmitLoading: false,
    previewImgUrl: null,
    previewImgHtml: null,
    pattern: "add",
    roomTypes: [
      { name: "民宿", value: 1 },
      { name: "别墅", value: 2 },
      { name: "酒店", value: 3 }
    ],
    districts: [],
    configs: []
  };

  // 表格数据项
  currentRoomId: number;
  dataSet: Room[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };

  // 搜索表单
  filterForm = {
    text: "",
    roomType: ""
  };

  // 房间新增/编辑信息
  roomValidateForm: FormGroup;
  roomArticleData: {
    Description: string,
    RoomInfoDetail: string
  } = {
      Description: "",
      RoomInfoDetail: ""
    };
  priceConfigForm: FormGroup;
  priceConfigs: RoomPriceConfig[] = [];
  // 图片列表
  titleImgList: UploadFile[] = [];
  descriptionImgList: UploadFile[] = [];
  infoImgList: UploadFile[] = [];
  bannerImgList: UploadFile[] = [];


  ngOnInit (): void {
    this.refreshData();
    // 上传器事件绑定
    this.bannerImgsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "bannerImg");
    };
    this.descriptionImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "descriptionImg");
    };
    this.infoImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "infoImg");
    };
    this.titleImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.handleFileUploaded(item, response, status, headers, "titleImg");
    };
    // 表单验证规则
    this.roomValidateForm = new FormGroup({
      RoomName: new FormControl("", [Validators.required]),
      BasePrice: new FormControl(0, [Validators.required]),
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
    this.priceConfigForm = new FormGroup({
      UID: new FormControl(""),
      PriceDateStart: new FormControl(null, [Validators.required]),
      PriceDateEnd: new FormControl(null, [Validators.required]),
      PricePercent: new FormControl(0, [Validators.min(1)]),
      ExtraPrice: new FormControl(0),
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
    this.getFormControl("Configs").setValue([]);
    this.getFormControl("IsBargainPrice").setValue(false);
    this.priceConfigs = [];
    this.titleImgList = [];
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
    let selectedConfigIds: string[] = [];
    this.vm.configs.forEach((item: any) => {
      if (currentRoom.ConfigString ? currentRoom.ConfigString.includes(item.value) : false) {
        selectedConfigIds.push(item.value);
      }
    });
    this.vm.isFormVisible = true;
    this.vm.pattern = "edit";
    this.roomValidateForm.setValue({
      RoomName: currentRoom.RoomName,
      BasePrice: currentRoom.BasePrice || 0,
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
      Configs: selectedConfigIds
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
    this.priceConfigs = [];
    if (currentRoom.PriceConfigs) {
      currentRoom.PriceConfigs.forEach(config => {
        let temp: RoomPriceConfig = new RoomPriceConfig(
          config.UID || uuid(),
          config.PriceDateStart,
          config.PriceDateEnd,
          config.PriceDateStartString,
          config.PriceDateEndString,
          config.PricePercent,
          config.ExtraPrice);
        this.priceConfigs.push(temp);
      });
    }

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
      url: currentRoom.RoomInfoPic,
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
    // 组装数据
    Object.assign(data, this.roomValidateForm.value);
    data.RoomId = this.currentRoomId;
    data.ConfigString = data.Configs.join(",");
    data.PicUrl = this.titleImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.DescriptionPic = this.descriptionImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.Description = this.roomArticleData.Description;
    data.RoomInfoPic = this.infoImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.RoomInfoDetail = this.roomArticleData.RoomInfoDetail;
    data.Photos = this.bannerImgList.filter(img => img.isUploaded && img.isSuccess).map(img => img.url).join(",");
    data.PriceConfigs = [];
    if (this.priceConfigs) {
      this.priceConfigs.forEach(config => {
        let temp: any = {
          PriceDateStart: config.PriceDateStart,
          PriceDateEnd: config.PriceDateEnd,
          PricePercent: config.PricePercent,
          ExtraPrice: config.ExtraPrice
        };
        data.PriceConfigs.push(temp);
      });
    }
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
        imglist = this.bannerImgList;
        imglist.unshift({
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
    imgFile.isUploading = true;
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
    let url: string = JSON.parse(response).Data;
    switch (type) {
      case "titleImg":
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
    if (img) {
      img.url = this.trim(url, "\"");
      img.isReady = true;
      img.isSuccess = true;
      img.isUploaded = true;
      img.isUploading = false;
    }
  }

  // 查看图片
  showModal (item: UploadFile): void {
    this.vm.previewImgUrl = this.sanitizer.bypassSecurityTrustUrl(item.url);
    this.vm.previewImgHtml = this.sanitizer.bypassSecurityTrustHtml(`<img src=${item.url} style="width: 100%" />`);
    this.vm.isPreviewVisible = true;
  }

  getFormControl (name: string): AbstractControl {
    return this.roomValidateForm.controls[name];
  }
  getPriceFormControl (name: string): AbstractControl {
    return this.priceConfigForm.controls[name];
  }

  formatterPercent = value => {
    if (value) {
      return value + "%";
    } else {
      return value === 0 ? 0 : "";
    }
  }
  parserPercent = value => value.replace("%", "");

  disabledStartDate = (startValue: Date): boolean => {
    let endDate: Date = this.priceConfigForm.controls.PriceDateEnd.value;
    if (!endDate || !startValue) {
      return false;
    }
    return startValue.getTime() >= endDate.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    let startDate: Date = this.priceConfigForm.controls.PriceDateStart.value;
    if (!startDate || !endValue) {
      return false;
    }
    return endValue.getTime() <= startDate.getTime();
  }

  openEditPriceConfigForm (config: RoomPriceConfig): void {
    this.vm.isPriceCalenderFormVisible = true;
    this.priceConfigForm.setValue({
      UID: config.UID,
      PriceDateStart: config.PriceDateStart,
      PriceDateEnd: config.PriceDateEnd,
      PricePercent: config.PricePercent,
      ExtraPrice: config.ExtraPrice
    });
  }
  handleAddPriceCalender (form: NgForm): void {
    let temp: RoomPriceConfig = new RoomPriceConfig(
      this.priceConfigForm.controls.UID.value || uuid(),
      this.priceConfigForm.controls.PriceDateStart.value,
      this.priceConfigForm.controls.PriceDateEnd.value,
      this.formatDate(this.priceConfigForm.controls.PriceDateStart.value),
      this.formatDate(this.priceConfigForm.controls.PriceDateEnd.value),
      this.priceConfigForm.controls.PricePercent.value,
      this.priceConfigForm.controls.ExtraPrice.value);
    let index: number = this.priceConfigs.findIndex(config => config.UID === temp.UID);
    if (index < 0) {
      this.priceConfigs.push(temp);
    } else {
      Object.assign(this.priceConfigs[index], temp);
    }
    this.priceConfigForm.reset();
    this.vm.isPriceCalenderFormVisible = false;
  }

  trim (origin: string, char: string): string {
    if (char) {
      return origin.replace(new RegExp(`^\\${char}+|\\${char}+$`, "g"), "");
    }
    return origin.replace(/^\s+|\s+$/g, "");
  }

  private formatDate (date: Date): string {
    let Y: number = date.getFullYear(),
      M: number = date.getMonth() + 1,
      d: number = date.getDate();
    let yearString: string = Y.toString().slice(2);
    let monthString: string = M >= 10 ? `${M}` : "0" + M;
    let dayString: string = d >= 10 ? `${d}` : "0" + d;
    return `${yearString}-${monthString}-${dayString}`;
  }
}

