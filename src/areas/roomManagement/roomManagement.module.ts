import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { RoomManagementComponent } from "./roomManagement.component";
import { RoomManagementService } from "./roomManagement.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
  ],
  declarations: [RoomManagementComponent],
  providers: [RoomManagementService]
})
export class RoomManagementModule { }