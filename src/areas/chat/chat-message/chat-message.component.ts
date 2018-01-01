import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";

import User from "models/user/user.model";
import { ChatMessage } from "models/chat/chat.message.model";

@Component({
  selector: "chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"]
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  currentUser: User;
  incoming: boolean;

  constructor() {
    // todo
  }

  ngOnInit(): void {
    // todo
  }
}
