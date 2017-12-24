import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { EditorModule } from "commons/components/editor/editor.module";
import { FileUploadModule } from "ng2-file-upload";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { RoomManagementComponent } from "./roomManagement.component";
import { RoomManagementService } from "./roomManagement.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    EditorModule,
    NgZorroAntdModule,
  ],
  declarations: [RoomManagementComponent],
  providers: [RoomManagementService]
})
export class RoomManagementModule { }