import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { PipesModule } from "commons/pipes/pipes.module";
import { EditorModule } from "commons/components/editor/editor.module";
import { ModelsModule } from "models/models.module";

import { ChatService } from "./chat.service";
import { ChatPageComponent } from "./chat-page/chat-page.component";
import { ChatMessageComponent } from "./chat-message/chat-message.component";

const chatRoutes: Routes = [
    {
        path: "",
        component: ChatPageComponent
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        EditorModule,
        NgZorroAntdModule,
        ModelsModule,
        RouterModule.forChild(chatRoutes),
    ],
    declarations: [
        ChatPageComponent,
        ChatMessageComponent
    ],
    providers:[
        ChatService
    ]
})
export class ChatModule { }