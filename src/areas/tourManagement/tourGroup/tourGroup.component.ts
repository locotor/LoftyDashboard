import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

import { TourManagementService } from "../tourManagement.service";
import { TourGroup } from "models/tour/tourGroup.model";
import { NgTemplateOutlet } from '@angular/common';

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
    isPreviewVisible: false,
    pattern: "add",
    searchOptions: [],
  };
  previewImage: SafeHtml;
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

  /**
   * 刷新数据
   * @param reset 是否重置表格数据
   */
  refreshData (reset: boolean = false): void {
    if (reset) {
      this.tablePagination.pageIndex = 1;
    }
    this.vm.tableLoading = true;
    this._orderService.getOrderList(
      this.tablePagination.pageIndex,
      this.tablePagination.pageSize,
      this.filterForm.orderId,
      this.filterForm.roomId
    ).subscribe((rspd: any) => {
      this.vm.tableLoading = false;
      this.dataSet = rspd.Data;
      this.tablePagination.total = rspd.Total;
    });
  }

  // 打开房间新建列表
  openAddDialog (): void {
    this.vm.pattern = "add";
    this.tourGroupValidateForm.reset();
    this.vm.isFormVisible = true;
  }

  /**
   * 打开房间编辑界面
   * @param currentRoom 房间对象
   */
  handleEditClick (currentOrder: Order): void {
    this.currentOrderId = currentOrder.OrderId;
    this.vm.isFormVisible = true;
    this.vm.pattern = "edit";
    this.tourGroupValidateForm.setValue({
      RoomId: currentOrder.RoomId,
      PayTime: new Date(currentOrder.PayTimeString),
      Amount: currentOrder.Amount,
      PhoneNumber: currentOrder.PhoneNumber,
      Status: currentOrder.Status,
      UserId: currentOrder.UserId,
      StartTime: new Date(currentOrder.StartTimeString),
      EndTime: new Date(currentOrder.EndTimeString)
    });
    for (let cName in this.tourGroupValidateForm.controls) {
      if (this.tourGroupValidateForm.controls.hasOwnProperty(cName)) {
        this.tourGroupValidateForm.controls[cName].markAsDirty();
      }
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
    Object.assign(data, this.tourGroupValidateForm.value);
    data.OrderId = this.currentOrderId;
    // 提交
    if (this.vm.pattern === "add") {
      this.vm.isSubmitLoading = true;
      this._orderService.createOrder(data).subscribe(rspd => {
        this.vm.isFormVisible = false;
        this.vm.isSubmitLoading = false;
        if (rspd) {
          this._message.create("success", "新增订单成功！");
          this.refreshData();
        }
      });
    } else if (this.vm.pattern === "edit") {
      this.vm.isSubmitLoading = true;
      this._orderService.updateOrder(data).subscribe((rspd: any) => {
        this.vm.isFormVisible = false;
        this.vm.isSubmitLoading = false;
        if (rspd) {
          this._message.create("success", "修改订单成功！");
          this.refreshData();
        }
      });
    }
  }

  getFormControl (name: string): AbstractControl {
    return this.tourGroupValidateForm.controls[name];
  }


}
