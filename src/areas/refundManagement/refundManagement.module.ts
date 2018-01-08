import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditorModule } from "commons/components/editor/editor.module";
import { FileUploadModule } from "ng2-file-upload";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { RefundManagementComponent } from "./refundManagement.component";
import { RefundManagementService } from "./refundManagement.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    EditorModule,
    NgZorroAntdModule,
  ],
  declarations: [RefundManagementComponent],
  providers: [RefundManagementService]
})
export class RefundManagementModule { }