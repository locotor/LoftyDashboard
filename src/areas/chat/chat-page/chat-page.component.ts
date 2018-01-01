import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppContextService } from "commons/utilities/app-context.service";
import { ChatService } from "../chat.service";
import { NzMessageService } from "ng-zorro-antd";
import { ChatUser } from "models/user/chat.user.model";
import { ChatMessage } from "models/chat/chat.message.model";

@Component({
  selector: "chat-page",
  templateUrl: "./chat-page.component.html",
  styleUrls: ["./chat-page.component.scss"]
})
export class ChatPageComponent implements OnInit {
  public chatList = {
    targets: Array<ChatUser>(),
    loading: false,
    pageSize: 10,
    totalAmount: 0,
    currentPage: 1
  };
  public currentTarget: ChatUser;
  public currentConversation: ChatMessage[];

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

  public getTagetList(): void {
    // todo
  }

  public handleChatClicked(chat: any): void {
    // todo
  }

  sendMessage(content: string): void {
    this._apiService.sendChat(content, this.currentTarget.UserId);
  }

  private scrollToBottom(): void {
    // const scrollPane: any = this.el.nativeElement.querySelector(".msg-container");
    // scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
