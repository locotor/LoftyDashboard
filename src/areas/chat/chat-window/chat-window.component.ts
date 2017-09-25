import {
    Component,
    Inject,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';

import { ThreadService } from '../../../models/thread/thread.service';
import { ChatService } from '../../../models/chat/chat.service';
import { UserService } from '../../../models/user/user.service';
import User from '../../../models/user/user.model';
import Thread from '../../../models/thread/thread.model';
import Chat from '../../../models/chat/chat.model';

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
    currentThread: Thread;
    draftChat: Chat;
    currentUser: User;

    public messages: Observable<Chat[]>;

    constructor(public chatService: ChatService,
        public threadService: ThreadService,
        public UserService: UserService,
        public snackBar: MdSnackBar,
        private el: ElementRef) {
    };

    ngOnInit(): void {
        // this.messages = this.threadService.currentThreadMessages;
        this.draftChat = new Chat();
        this.threadService.currentThread.subscribe(
            (thread: Thread) => {
                this.currentThread = thread;
            });
        this.UserService.currentUser
            .subscribe(
            (user: User) => {
                this.currentUser = user;
            });
        this.messages.subscribe(
            (messages: Array<Chat>) => {
                setTimeout(() => {
                    this.scrollToBottom();
                });
            });
    }

    onEnter(content: string): void {
        if (content) {
            this.sendMessage(content);
        } else {
            this.snackBar.open("输入内容不能为空","关闭", {
                duration: 1000,
            });
        }
    }


    sendMessage(content: string): void {
        const m: Chat = this.draftChat;
        m.text = content;
        m.author = this.currentUser;
        m.thread = this.currentThread;
        m.isRead = true;
        this.chatService.addChat(m);
        this.draftChat = new Chat();
    }

    private scrollToBottom(): void {
        const scrollPane: any = this.el.nativeElement.querySelector('.msg-container');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }
}
