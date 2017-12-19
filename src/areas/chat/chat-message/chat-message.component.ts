import {
  Component,
  OnInit,
  Input
} from "@angular/core";
import { Observable } from "rxjs/Observable";


import User from "../../../models/user/user.model";
import Thread from "../../../models/thread/thread.model";
import Chat from "../../../models/chat/chat.model";

@Component({
  selector: "chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"]
})
export class ChatMessageComponent implements OnInit {
  @Input() chat: Chat;
  currentUser: User;
  incoming: boolean;

  constructor() {
    // todo
  }

  ngOnInit (): void {
    // todo
  }
}
