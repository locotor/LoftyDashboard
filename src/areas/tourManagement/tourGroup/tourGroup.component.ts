import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

import { TourManagementService } from "../tourManagement.service";
import { TourGroup } from "models/tour/tourGroup.model";

@Component({
  templateUrl: "./tourGroup.component.html",
  styleUrls: ["./tourGroup.component.scss"]
})
export class TourGroupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _apiService: TourManagementService,
    private _message: NzMessageService
  ) { }

  vm = {
    tableLoading: true,
    isFormVisible: false,
    isSubmitLoading: false,
    isImgLoading:false,
    isPreviewVisible: false,
    pattern: "add",
    searchOptions: [],
  };
  previewImage: SafeHtml;
  coverImageUrl:string;
  filterForm = {
    name: ""
  };
  tourGroupValidateForm: FormGroup;
  currentGroupId: string;
  dataSet: TourGroup[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };

  ngOnInit (): void {
    this.refreshData();
    // 表单验证规则
    this.tourGroupValidateForm = new FormGroup({
      Name: new FormControl("", [Validators.required]),
      Description: new FormControl("", [Validators.required]),
    });
  }

  // 重新获取表格数据
  reset (): void {
    this.refreshData(true);
  }

  /** 刷新数据
   * @param reset 是否重置表格数据
   */
  refreshData (reset: boolean = false): void {
    if (reset) {
      this.tablePagination.pageIndex = 1;
    }
    this.vm.tableLoading = true;
    this._apiService.getOrderList(
      this.tablePagination.pageIndex,
      this.tablePagination.pageSize,
      this.filterForm.name,
    ).subscribe((rspd: any) => {
      this.vm.tableLoading = false;
      this.dataSet = rspd.Data;
      this.tablePagination.total = rspd.Total;
    });
  }

  // 打开新建界面
  handleAddClick (): void {
    this.vm.pattern = "add";
    this.tourGroupValidateForm.reset();
    this.vm.isFormVisible = true;
  }

  /** 打开编辑界面
   * @param currentRoom 房间对象
   */
  handleEditClick (currentGroup: TourGroup): void {
    this.currentGroupId = currentGroup.Id;
    this.vm.isFormVisible = true;
    this.vm.pattern = "edit";
    this.tourGroupValidateForm.setValue({});
    for (let cName in this.tourGroupValidateForm.controls) {
      if (this.tourGroupValidateForm.controls.hasOwnProperty(cName)) {
        this.tourGroupValidateForm.controls[cName].markAsDirty();
      }
    }
  }

  // 封面图片文件改变
  handleImgChange (info: { file: any }):void {
    if (info.file.status === "uploading") {
      this.vm.isImgLoading = true;
      return;
    }
    if (info.file.status === "done") {
      this.vm.isImgLoading = false;
      this.coverImageUrl = info.file.response.Data;
      // this.getBase64(info.file.originFileObj, (img: any) => {
      //   this.vm.isImgLoading = false;
      //   this.coverImageUrl = img;
      // });
    }
  }

  private getBase64(img: File, callback: (img: any) => void):void {
    const reader:FileReader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // 处理封面预览
  handlePreview (currentGroup: TourGroup): void {
    this.previewImage = this.sanitizer.bypassSecurityTrustHtml(`<img src=${currentGroup.CoverImage} style="width: 100%" />`);
    this.vm.isPreviewVisible = true;
  }

  // 处理表单提交
  handleFormSubmit (): void {
    let data: any = {};
    function handleSubmitFinish (r: any, message: string): void {
      this.vm.isFormVisible = false;
      this.vm.isSubmitLoading = false;
      if (r) {
        this._message.create("success", message);
        this.refreshData();
      }
    }
    // 组装数据
    Object.assign(data, this.tourGroupValidateForm.value);
    data.OrderId = this.currentGroupId;
    this.vm.isSubmitLoading = true;
    // 提交
    if (this.vm.pattern === "add") {
      this._apiService.createOrder(data).subscribe(rspd => handleSubmitFinish(rspd, "新增分组成功！"));
    } else if (this.vm.pattern === "edit") {
      this._apiService.updateOrder(data).subscribe((rspd: any) => handleSubmitFinish(rspd, "修改分组成功！"));
    }
  }

  getFormControl (name: string): AbstractControl {
    return this.tourGroupValidateForm.controls[name];
  }


}
