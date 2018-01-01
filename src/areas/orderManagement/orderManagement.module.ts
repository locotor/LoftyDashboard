import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { OrderManagementComponent } from "./orderManagement.component";
import { OrderManagementService } from "./orderManagement.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
  ],
  declarations: [OrderManagementComponent],
  providers: [OrderManagementService]
})
export class OrderManagementModule { }