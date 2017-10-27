import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ChatService } from "../chat.service";
import { AppContextService } from "../../../commons/utilities/app-context.service";


@Component({
  selector: "chat-page",
  templateUrl: "./chat-page.component.html",
  styleUrls: ["./chat-page.component.scss"]
})
export class ChatPageComponent implements OnInit {

  constructor(
    private _appContext: AppContextService,
    // private _apiService: ChatService
  ) { }

  ngOnInit(): void {
    // todo
  }

  onEnter(content: string): void {
    // if (content) {
    //     this.sendMessage(content);
    // } else {
    //     this.snackBar.open("输入内容不能为空","关闭", {
    //         duration: 1000,
    //     });
    // }
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
