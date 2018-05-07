import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

import { TourManagementService } from "../tourManagement.service";
import { Tour } from "models/tour/tour.model";
import { TranspotCost } from "models/tour/transportCost.model";

@Component({
  templateUrl: "./tour.component.html",
  styleUrls: ["./tour.component.scss"]
})
export class TourComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _apiService: TourManagementService,
    private _message: NzMessageService
  ) { }

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
  filterForm = {
    name: ""
  };
  tourValidateForm: FormGroup;
  currentTourId: string;
  tourDataSet: Tour[] = [];
  tourTablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };
  previewImage:SafeHtml;

  ngOnInit (): void {
    throw new Error("Method not implemented.");
  }

   // 打开新建界面
   handleAddClick (): void {
    this.vm.pattern = "add";
    this.tourValidateForm.reset();
    this.vm.isTourFormVisible = true;
  }

  /** 打开编辑界面
   * @param currentRoom 房间对象
   */
  handleEditClick (tour: Tour): void {
    this.currentTourId = tour.Id;
    this.vm.isTourFormVisible = true;
    this.vm.pattern = "edit";
    this.tourValidateForm.setValue({});
    for (let cName in this.tourValidateForm.controls) {
      if (this.tourValidateForm.controls.hasOwnProperty(cName)) {
        this.tourValidateForm.controls[cName].markAsDirty();
      }
    }
  }

  // 封面图片文件改变
  handleImgChange (info: { file: any }):void {
    if (info.file.status === "uploading") {
      this.vm.isImgUploading = true;
      return;
    }
    if (info.file.status === "done") {
      this.vm.isImgUploading = false;
      this.coverImageUrl = info.file.response.Data;
      // this.getBase64(info.file.originFileObj, (img: any) => {
      //   this.vm.isImgUploading = false;
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
  // handlePreview (currentTour: TourGroup): void {
  //   this.previewImage = this.sanitizer.bypassSecurityTrustHtml(`<img src=${currentTour.CoverImage} style="width: 100%" />`);
  //   this.vm.isPreviewVisible = true;
  // }

  // 处理表单提交
  handleFormSubmit (): void {
    let data: any = {};
    function handleSubmitFinish (r: any, message: string): void {
      this.vm.isTourFormVisible = false;
      this.vm.isSubmitLoading = false;
      if (r) {
        this._message.create("success", message);
        this.refreshData();
      }
    }
    // 组装数据
    Object.assign(data, this.tourValidateForm.value);
    data.OrderId = this.currentTourId;
    this.vm.isTourSubmitLoading = true;
    // 提交
    if (this.vm.pattern === "add") {
      this._apiService.createOrder(data).subscribe(rspd => handleSubmitFinish(rspd, "新增分组成功！"));
    } else if (this.vm.pattern === "edit") {
      this._apiService.updateOrder(data).subscribe((rspd: any) => handleSubmitFinish(rspd, "修改分组成功！"));
    }
  }

  getFormControl (name: string): AbstractControl {
    return this.tourValidateForm.controls[name];
  }
}
