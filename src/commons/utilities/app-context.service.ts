import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { ChatMessage } from "models/chat/chat.message.model";
import User from "models/user/user.model";

@Injectable()
export class AppContextService implements OnInit {
    constructor() {
        // todo
    }
    private chatAnnouncedSource = new Subject<ChatMessage>();
    chatAnnounced$ = this.chatAnnouncedSource.asObservable();
    singlrService: any;
    currentUser: User;

    ngOnInit(): void {
        let jQuery: any = $;
        this.singlrService = jQuery.connection.LoftyHub;
        this.singlrService.connection.start();
        this.singlrService.client.ReceiveChatMessage = function (detail: any): void {
            let chatData: ChatMessage = JSON.parse(detail);
            this.chatAnnouncedSource.next(chatData);
        };
    }
}
