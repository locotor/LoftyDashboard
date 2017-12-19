import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { EditorModule } from "commons/components/editor/editor.module";

import { MessagePageComponent } from "./message-page/message-page.component";
import { MessageWindowComponent } from "./message-window/message-window.component";
import { MessageService } from "./message.service";

const messageRoutes: Routes = [
  {
    path: "",
    component: MessagePageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    EditorModule,
    RouterModule.forChild(messageRoutes),
  ],
  declarations: [
    MessagePageComponent,
    MessageWindowComponent
  ],
  providers: [
    MessageService
  ]
})
export class MessageModule { }