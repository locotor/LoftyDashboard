import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MdListModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule,
  MdButtonModule,
  MdInputModule,
  MdSnackBarModule,
  MdTabsModule,
  MdCardModule,
  MdPaginatorModule,
} from '@angular/material';

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
    MdListModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
    MdTabsModule,
    MdCardModule,
    MdPaginatorModule,
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