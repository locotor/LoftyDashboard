import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";

import { DataTableBase } from "commons/base/dateTableBase.class";
import { TourManagementService } from "../tourManagement.service";
import { TourGroup } from "models/tour/tourGroup.model";

@Component({
  templateUrl: "./tourGroup.component.html",
  styleUrls: ["./tourGroup.component.scss"]
})
export class TourGroupComponent extends DataTableBase<TourGroup> implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private _apiService: TourManagementService,
    private _message: NzMessageService
  ) {
    super();
  }

  vm = {
    tableLoading: true,
    isFormVisible: false,
    isSubmitLoading: false,
    isImgLoading: false,
    isPreviewVisible: false,
    pattern: "add",
  };
  previewImage: SafeHtml;
  coverImageUrl: string;
  formGroup: FormGroup;
  currentId: string;

  ngOnInit (): void {
    this.refreshData();
    // 表单验证规则
    this.formGroup = new FormGroup({
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
      this.pagination.pageIndex = 1;
    }
    this.vm.tableLoading = true;
    this._apiService.getOrderList(
      this.pagination.pageIndex,
      this.pagination.pageSize,
      this.filterForm.name,
    ).subscribe((rspd: any) => {
      this.vm.tableLoading = false;
      this.dataSet = rspd.Data;
      this.pagination.total = rspd.Total;
    });
  }

  // 打开新建界面
  handleAddClick (): void {
    this.vm.pattern = "add";
    this.formGroup.reset();
    this.vm.isFormVisible = true;
  }

  /** 打开编辑界面
   * @param currentRoom 房间对象
   */
  handleEditClick (currentGroup: TourGroup): void {
    this.currentId = currentGroup.Id;
    this.vm.isFormVisible = true;
    this.vm.pattern = "edit";
    this.formGroup.setValue({});
    for (let cName in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(cName)) {
        this.formGroup.controls[cName].markAsDirty();
      }
    }
  }

  // 封面图片文件改变
  handleImgChange (info: { file: any }): void {
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

  // 处理封面预览
  handlePreview (currentGroup: TourGroup): void {
    this.previewImage = this.sanitizer.bypassSecurityTrustHtml(`<img src=${currentGroup.CoverImage} style="width: 100%" />`);
    this.vm.isPreviewVisible = true;
  }

  // 处理表单提交
  handleFormSubmit (): void {
    let data: any = {};
    // 组装数据
    Object.assign(data, this.formGroup.value);
    data.OrderId = this.currentId;
    this.vm.isSubmitLoading = true;
    // 提交
    if (this.vm.pattern === "add") {
      this._apiService.createOrder(data).subscribe(rspd => this.handleSubmitFinish(rspd, "新增分组成功！"));
    } else if (this.vm.pattern === "edit") {
      this._apiService.updateOrder(data).subscribe((rspd: any) => this.handleSubmitFinish(rspd, "修改分组成功！"));
    }
  }

  getFormControl (name: string): AbstractControl {
    return this.formGroup.controls[name];
  }

  private handleSubmitFinish (r: any, message: string): void {
    this.vm.isFormVisible = false;
    this.vm.isSubmitLoading = false;
    if (r) {
      this._message.create("success", message);
      this.refreshData();
    }
  }

  private getBase64 (img: File, callback: (img: any) => void): void {
    const reader: FileReader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

}
