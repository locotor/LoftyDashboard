import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoomManagementComponent } from "./roomManagement.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
  ],
  declarations: [RoomManagementComponent]
})
export class RoomManagementModule { }