import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatService } from '../../../models/chat/chat.service';
import { UserService } from '../../../models/user/user.service';
import { ThreadService } from '../../../models/thread/thread.service';
import { AppContextService } from "../../../root/app-context.service";

import { ChatExampleData } from "../test-data/test-data";


@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(
    public userService: UserService,
    public chatService: ChatService,
    public threadService: ThreadService,
    private _appContext: AppContextService
  ) { }

  ngOnInit() {
    this._appContext.currentUser.subscribe(
      user => {
        console.log("后台发过来的数据: ", user)
        ChatExampleData.init(this.chatService, this.threadService, this.userService, user);
      })
  }
}
