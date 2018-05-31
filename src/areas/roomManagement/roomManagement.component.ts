import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService, UploadFile } from "ng-zorro-antd";
import { RoomManagementService } from "./roomManagement.service";
import { Room } from "models/room/room.model";
import { RoomPriceConfig } from "models/room/roomPriceConfig.model";
import { NgForm } from "@angular/forms";
import uuid from "commons/utilities/uuid";

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
  isPreviewVisible: boolean = false;
  previewImage: SafeHtml;
  descriptionImg = [];
  infoImg = [];
  titleImg = [];
  bannerImg = [];

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
  titleImgList = [];
  descriptionImgList = [];
  infoImgList = [];
  bannerImgList = [];


  ngOnInit(): void {
    this.refreshData();
    // 房间基本信息表单项
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
    // 房间价格配置表单项
    this.priceConfigForm = new FormGroup({
      UID: new FormControl(""),
      PriceDateStart: new FormControl(new Date(), [Validators.required]),
      PriceDateEnd: new FormControl(new Date(), [Validators.required]),
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

  /** 重新获取表格数据
   */
  reset(): void {
    this.refreshData(true);
  }

  /** 刷新数据
   * @param reset 是否重置表格数据
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

  /** 打开房产新建列表
   */
  openAddDialog(): void {
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

  /** 打开房产编辑界面
   * @param currentRoom 房产对象
   */
  handleEditClick(currentRoom: Room): void {
    this.currentRoomId = currentRoom.RoomId;
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
      Configs: this.vm.configs.filter(config => {
        return currentRoom.ConfigString ? currentRoom.ConfigString.includes(config.value) : false;
      }).map(config => config.value)
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
    this.titleImg = this.assembleSaveImgList(currentRoom.PicUrl);
    this.descriptionImg = this.assembleSaveImgList(currentRoom.DescriptionPic);
    this.infoImg = this.assembleSaveImgList(currentRoom.RoomInfoPic);
    this.bannerImg = this.assembleSaveImgList(currentRoom.Photos);
  }

  private assembleSaveImgList(imgUrls: string): any[] {
    return imgUrls ? imgUrls.replace(/[\r\n]/g, "").split(",").map(img => {
      return {
        uid: uuid(),
        name: img.split("/").pop(),
        status: "done",
        url: img,
        thumbUrl: img
      };
    }) : [];
  }

  /** 删除房产信息
   * @param data 房产对象
   */
  handleDelteClick(data: Room): void {
    this._roomService.deleteRoom(data.RoomId).subscribe(rspd => {
      if (rspd) {
        this._message.create("success", "删除房产信息成功");
        this.refreshData();
      }
    });
  }

  // 处理表单提交
  handleFormSubmit(): void {
    let data: any = {};
    // 组装数据
    Object.assign(data, this.roomValidateForm.value, {
      RoomId: this.currentRoomId,
      Description: this.roomArticleData.Description,
      RoomInfoDetail: this.roomArticleData.RoomInfoDetail,
      PicUrl: this.titleImg.map(img => img.url).join(","),
      DescriptionPic: this.descriptionImg.map(img => img.url).join(","),
      RoomInfoPic: this.infoImg.map(img => img.url).join(","),
      Photos: this.bannerImg.map(img => img.url).join(","),
      PriceConfigs: this.priceConfigs.map(config => {
        return {
          PriceDateStart: config.PriceDateStart,
          PriceDateEnd: config.PriceDateEnd,
          PricePercent: config.PricePercent,
          ExtraPrice: config.ExtraPrice
        };
      })
    });

    data.ConfigString = data.Configs.join(",");
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

  hanldeImgChange(info: { file: UploadFile }, imglist: string): void {
    if (info && info.file.status === "done") {
      info.file.url = info.file.response.Data;
      if (imglist === "bannerImg") {
        this[imglist].push(info.file);
      } else {
        this[imglist] = [info.file];
      }
    }
  }

  hanldeImgPreview = (file: UploadFile): void => {
    this.isPreviewVisible = true;
    let image: string = file.url || file.thumbUrl;
    this.previewImage = this.sanitizer.bypassSecurityTrustHtml(`<img src=${image} style="width: 100%" />`);
  }

  // 查看图片
  showModal(item: any): void {
    this.vm.previewImgUrl = this.sanitizer.bypassSecurityTrustUrl(item.url);
    this.vm.previewImgHtml = this.sanitizer.bypassSecurityTrustHtml(`<img src=${item.url} style="width: 100%" />`);
    this.vm.isPreviewVisible = true;
  }

  getFormControl(name: string): AbstractControl {
    return this.roomValidateForm.controls[name];
  }
  getPriceFormControl(name: string): AbstractControl {
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

  openEditPriceConfigForm(config: RoomPriceConfig): void {
    this.vm.isPriceCalenderFormVisible = true;
    this.priceConfigForm.setValue({
      UID: config.UID,
      PriceDateStart: config.PriceDateStart,
      PriceDateEnd: config.PriceDateEnd,
      PricePercent: config.PricePercent,
      ExtraPrice: config.ExtraPrice
    });
  }
  handleAddPriceCalender(form: NgForm): void {
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

  trim(origin: string, char: string): string {
    if (char) {
      return origin.replace(new RegExp(`^\\${char}+|\\${char}+$`, "g"), "");
    }
    return origin.replace(/^\s+|\s+$/g, "");
  }

  private formatDate(date: Date): string {
    let Y: number = date.getFullYear(),
      M: number = date.getMonth() + 1,
      d: number = date.getDate();
    let yearString: string = Y.toString().slice(2);
    let monthString: string = M >= 10 ? `${M}` : "0" + M;
    let dayString: string = d >= 10 ? `${d}` : "0" + d;
    return `${yearString}-${monthString}-${dayString}`;
  }
}

