import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppContextService } from "commons/utilities/app-context.service";
import { ChatService } from "../chat.service";
import { NzMessageService } from "ng-zorro-antd";


@Component({
  selector: "chat-page",
  templateUrl: "./chat-page.component.html",
  styleUrls: ["./chat-page.component.scss"]
})
export class ChatPageComponent implements OnInit {
  public chatList = {
    chats: Array<any>(),
    loading: false,
    pageSize: 10,
    totalAmount: 0,
    currentPage: 1
  };
  public currentChat: any;

  constructor(
    private _appContext: AppContextService,
    private _apiService: ChatService,
    private _messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    // todo
  }

  onEnter(content: string): void {
    if (content) {
      this.sendMessage(content);
    } else {
      this._messageService.create("warning", "输入内容不能为空!");
    }
  }

  public getChatList(): void {
    // todo
  }

  public handleChatClicked(chat: any): void {
    // todo
  }

  sendMessage(content: string): void {
    // const m: Chat = this.draftChat;
    // m.text = content;
    // m.author = this.currentUser;
    // m.thread = this.currentThread;
    // m.isRead = true;
    // this.chatService.addChat(m);
    // this.draftChat = new Chat();
  }

  private scrollToBottom(): void {
    // const scrollPane: any = this.el.nativeElement.querySelector(".msg-container");
    // scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
