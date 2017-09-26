import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MessageService } from "./message.service";

import { EditorModule } from "../../commons/components/editor/editor.module";
import { MessagePageComponent } from './message-page/message-page.component';
import { MessageWindowComponent } from './message-window/message-window.component';

const messageRoutes: Routes = [
  {
    path: '',
    component: MessagePageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    NgZorroAntdModule,
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