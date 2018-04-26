import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { TourManagementComponent } from "./tourManagement.component";
import { TourManagementService } from "./tourManagement.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
  ],
  declarations: [TourManagementComponent],
  providers: [TourManagementService]
})
export class TourManagementModule { }