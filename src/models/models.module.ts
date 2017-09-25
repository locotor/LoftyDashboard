import { NgModule } from "@angular/core";

import { ChatService } from "./chat/chat.service";
import { UserService } from "./user/user.service";
import { ThreadService } from "./thread/thread.service";
import { MessageStateService } from "./message/message-state.service";


@NgModule({
    providers: [
        ChatService,
        UserService,
        ThreadService,
        MessageStateService
    ]
})
export class ModelsModule { }