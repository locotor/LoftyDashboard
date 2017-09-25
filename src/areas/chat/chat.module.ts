import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
    MdListModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
} from '@angular/material';
import { PipesModule } from "../../commons/pipes/pipes.module";
import { EditorModule } from "../../commons/components/editor/editor.module";
import { ModelsModule } from "../../models/models.module";

import { ChatPageComponent } from "./chat-page/chat-page.component";
import { ChatThreadComponent } from "./chat-thread/chat-thread.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import { ChatMessageComponent } from "./chat-message/chat-message.component";

const chatRoutes: Routes = [
    {
        path: '',
        component: ChatPageComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdListModule,
        MdToolbarModule,
        MdMenuModule,
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        MdSnackBarModule,

        PipesModule,
        EditorModule,
        ModelsModule,
        RouterModule.forChild(chatRoutes),
    ],
    declarations: [
        ChatPageComponent,
        ChatThreadComponent,
        ChatWindowComponent,
        ChatMessageComponent
    ]
})
export class ChatModule { }