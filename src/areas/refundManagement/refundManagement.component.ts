import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { RefundManagementService } from "./refundManagement.service";
import { Order } from "models/order/order.model";
import { Refund } from "models/order/refund.model";

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
  templateUrl: "./refundManagement.component.html",
  styleUrls: ["./refundManagement.component.scss"]
})
export class RefundManagementComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private _apiService: RefundManagementService,
    private _message: NzMessageService) {
  }

  /*--- properties---*/
  vm = {
    tableLoading: true,
    isSubmitLoading: false,
    statusTypes: [
      { name: "未处理", value: 1 },
      { name: "同意", value: 2 },
      { name: "拒绝", value: 3 }
    ],
  };
  filterForm = {
    status: "",
    orderId: "",
    phone: "",
    applyUserAccount: ""
  };
  dataSet: Order[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };


  ngOnInit(): void {
    this.refreshData();
  }

  /*--- functions---*/

  /**
   * 重新获取表格数据
   */
  reset(): void {
    this.refreshData(true);
  }

  /**
   * 刷新数据
   * @param reset 是否重置表格数据
   */
  refreshData(reset: boolean = false): void {
    if (reset) {
      this.tablePagination.pageIndex = 1;
    }
    this.vm.tableLoading = true;
    this._apiService.getRefundList(
      this.tablePagination.pageIndex,
      this.tablePagination.pageSize,
      this.filterForm.status,
      this.filterForm.orderId,
      this.filterForm.phone,
      this.filterForm.applyUserAccount,
    ).subscribe((rspd: any) => {
      this.vm.tableLoading = false;
      this.dataSet = rspd.Data;
      this.tablePagination.total = rspd.Total;
    });
  }

  handleAcceptClick(row: Refund): void {
    this._apiService.passAlipayRefund(row.OrderId).subscribe((rspd: any) => {
      this._message.create("success", "同意退订申请完成");
    });
  }

  handleRefuseClick(row: Refund): void {
    this._apiService.refuseAlipayRefund(row.OrderId).subscribe((rspd: any) => {
      this._message.create("success", "拒绝退订申请完成");
    });
  }
}

