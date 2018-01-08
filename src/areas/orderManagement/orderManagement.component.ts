import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { OrderManagementService } from "./orderManagement.service";
import { Order } from "models/order/order.model";

@Component({
  templateUrl: "./orderManagement.component.html",
  styleUrls: ["./orderManagement.component.scss"]
})
export class OrderManagementComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _orderService: OrderManagementService,
    private _message: NzMessageService
  ) { }

  /*--- properties---*/
  vm = {
    tableLoading: true,
    isFormVisible: false,
    isSubmitLoading: false,
    pattern: "add",
    searchOptions: [],
  };
  rooms: {
    Key: number,
    Value: string
  }[];
  filterForm = {
    orderId: "",
    roomId: ""
  };
  orderValidateForm: FormGroup;
  currentOrderId: string;
  dataSet: Order[] = [];
  tablePagination = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  };

  ngOnInit(): void {
    this.refreshData();
    // 表单验证规则
    this.orderValidateForm = new FormGroup({
      RoomId: new FormControl("", [Validators.required]),
      PayTime: new FormControl("", [Validators.required]),
      Amount: new FormControl("", [Validators.required]),
      PhoneNumber: new FormControl("", [Validators.required]),
      Status: new FormControl("", [Validators.required]),
      UserId: new FormControl("", [Validators.required]),
      StartTime: new FormControl("", [Validators.required]),
      EndTime: new FormControl("", [Validators.required]),
    });
    this.orderValidateForm.controls.StartTime.valueChanges.subscribe(data => {
      if (this.orderValidateForm.value.EndTime) {
        if (data > this.orderValidateForm.value.EndTime) {
          this.getFormControl("EndTime").setValue(null);
        }
      }
    });
    this.orderValidateForm.controls.EndTime.valueChanges.subscribe(data => {
      if (this.orderValidateForm.value.StartTime) {
        if (this.orderValidateForm.value.StartTime > data) {
          this.getFormControl("StartTime").setValue(null);
        }
      }
    });
    // 获取配置项和地址
    this.route.data.subscribe(resolveData => {
      this.rooms = resolveData.rooms;
    });
  }


  /**
   * 搜索房间列表
   * @param searchText 房间搜索关键字
   */
  searchChange(searchText: string): void {
    // const query: string = encodeURI(searchText);
    this._orderService.roomAutoComplete(searchText).subscribe((data: any) => {
      this.vm.searchOptions = data;
    });
  }


  // 重新获取表格数据
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
  openAddDialog(): void {
    this.vm.pattern = "add";
    this.orderValidateForm.reset();
    this.vm.isFormVisible = true;
  }

  /**
   * 打开房间编辑界面
   * @param currentRoom 房间对象
   */
  handleEditClick(currentOrder: Order): void {
    this.currentOrderId = currentOrder.OrderId;
    this.vm.isFormVisible = true;
    this.vm.pattern = "edit";
    this.orderValidateForm.setValue({
      RoomId: currentOrder.RoomId,
      PayTime: new Date(currentOrder.PayTimeString),
      Amount: currentOrder.Amount,
      PhoneNumber: currentOrder.PhoneNumber,
      Status: currentOrder.Status,
      UserId: currentOrder.UserId,
      StartTime: new Date(currentOrder.StartTimeString),
      EndTime: new Date(currentOrder.EndTimeString)
    });
    for (let cName in this.orderValidateForm.controls) {
      if (this.orderValidateForm.controls.hasOwnProperty(cName)) {
        this.orderValidateForm.controls[cName].markAsDirty();
      }
    }
  }

  // 处理表单提交
  handleFormSubmit(): void {
    let data: any = {};
    // 组装数据
    Object.assign(data, this.orderValidateForm.value);
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

  getFormControl(name: string): AbstractControl {
    return this.orderValidateForm.controls[name];
  }

  disabledStartDate = (startValue: Date): boolean => {
    let endDate: Date = this.getFormControl("EndTime").value;
    if (!endDate || !startValue) {
      return false;
    }
    return startValue.getTime() >= endDate.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    let startDate: Date = this.getFormControl("StartTime").value;
    if (!startDate || !endValue) {
      return false;
    }
    return endValue.getTime() <= startDate.getTime();
  }
  mapRoomName(id: number): string {
    let room: any = this.rooms.find(room => {
      return room.Key === id;
    });
    if (room) {
      return room.Value;
    } else {
      return "";
    }
  }
}
