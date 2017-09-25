import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../models/user/user.service';
import { ThreadService } from '../../../models/thread/thread.service';
import { ChatService } from '../../../models/chat/chat.service';


import User from '../../../models/user/user.model';
import Thread from '../../../models/thread/thread.model';
import Chat from '../../../models/chat/chat.model';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() chat: Chat;
  currentUser: User;
  incoming: boolean;

  constructor(public UserService: UserService) {
  }

  ngOnInit(): void {
    this.UserService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
        if (this.chat.author && user) {
          this.incoming = this.chat.author.userId !== user.userId;
        }
      });
  }
}
