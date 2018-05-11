import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";

import { DataTableBase } from "commons/base/dateTableBase.class";
import { TourManagementService } from "../tourManagement.service";
import { Tour } from "models/tour/tour.model";
import { TranspotCost } from "models/tour/transportCost.model";

@Component({
  templateUrl: "./tour.component.html",
  styleUrls: ["./tour.component.scss"]
})
export class TourComponent extends DataTableBase<Tour> implements OnInit {

  constructor(
    private _apiService: TourManagementService,
    private _message: NzMessageService
  ) {
    super();
  }

  vm = {
    tourTableLoading: true,
    isTourFormVisible: false,
    isTourSubmitLoading: false,
    isImgUploading: false,
    isPreviewVisible: false,
    pattern: "add",
    searchOptions: [],
  };
  coverImageUrl: string;
  formGroup: FormGroup;
  currentId: string;
  previewImage: SafeHtml;

  ngOnInit (): void {
    throw new Error("Method not implemented.");
  }

  refreshData (): void {
    return;
  }

  // 打开新建界面
  handleAddClick (): void {
    this.vm.pattern = "add";
    this.formGroup.reset();
    this.vm.isTourFormVisible = true;
  }

  /** 打开编辑界面
   * @param currentRoom 房间对象
   */
  handleEditClick (tour: Tour): void {
    this.currentId = tour.Id;
    this.vm.isTourFormVisible = true;
    this.vm.pattern = "edit";
    this.formGroup.setValue({});
    for (let cName in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(cName)) {
        this.formGroup.controls[cName].markAsDirty();
      }
    }
  }

  // 封面图片文件改变
  handleImgChange (info: any): void {
    switch (info.file.status) {
      case "uploading":
        this.vm.isImgUploading = true;
        break;
      case "done":
        this.vm.isImgUploading = false;
        this.coverImageUrl = info.file.response.Data;
        break;
    }
  }

  // 处理表单提交
  handleFormSubmit (): void {
    // 组装数据
    let data: any = Object.assign({ OrderId: this.currentId }, this.formGroup.value);
    this.vm.isTourSubmitLoading = true;
    // 提交
    if (this.vm.pattern === "add") {
      this._apiService.createOrder(data).subscribe(rspd => this.handleSubmitFinish(rspd, "新增分组成功！"));
    } else if (this.vm.pattern === "edit") {
      this._apiService.updateOrder(data).subscribe(rspd => this.handleSubmitFinish(rspd, "修改分组成功！"));
    }
  }

  getFormControl (name: string): AbstractControl {
    return this.formGroup.controls[name];
  }

  private handleSubmitFinish (r: any, message: string): void {
    this.vm.isTourFormVisible = false;
    this.vm.isTourSubmitLoading = false;
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
