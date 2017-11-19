import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs/Observable";
import User from "models/user/user.model";
import Message from "models/message/message.model";
import { MessageService } from "../message.service";

const yang: User = new User("1", "成羊羊", 1, "assets/images/avatars/female-avatar-2.png");
const ting: User = new User("2", "李婷婷", 1, "assets/images/avatars/female-avatar-3.png");
const yin: User = new User("3", "张建英", 1, "assets/images/avatars/female-avatar-4.png");
const lin: User = new User("4", "罗松林", 1, "assets/images/avatars/male-avatar-1.png");

@Component({
  selector: "message-page",
  templateUrl: "./message-page.component.html",
  styleUrls: ["./message-page.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class MessagePageComponent implements OnInit {
  constructor(
    private _apiService: MessageService
  ) { }

  /*---ViewModel---*/
  public vm = {
    type: 1,
    status: 1,
  };
  /*---properties---*/
  public emailList = {
    messages: Array<Message>(),
    totalPage: 1,
    totalAmount: 0,
    currentPage: 1
  };
  public smsList = {
    messages: Array<Message>(),
    totalPage: 1,
    totalAmount: 0,
    currentPage: 1
  };
  public currentFilter: number = 0;
  public currentMessage: Message;

  /*---事件handler---*/
  ngOnInit (): void {
    /*-- for test --*/
    for (let i: number = 1; i <= 20; i++) {
      this.emailList.messages.push({
        Id: i,
        User: yang,
        Type: 1,
        TargetAddress: "XXXXXXX",
        Remark: "content",
        MessageStatus: 1
      });
      this.smsList.messages.push({
        Id: i,
        User: yin,
        Type: 2,
        TargetAddress: "XXXXXXX",
        Remark: "content",
        MessageStatus: 1
      });
    }

    this._apiService.getMessageList(this.vm.status, this.vm.type, 1, 10).subscribe(
      (rspd: any) => {
        console.log("email message list: ", rspd.Data);
        this.emailList.messages = rspd.Date;
        this.emailList.totalAmount = rspd.Total;
      },
      error => console.error("error: ", error)
    );
  }

  // onMessageClicked(message, envent) {
  //   this._messageService.scanMessage(message.Id).subscribe(
  //     resp => this.currentMessage = message,
  //     err => console.error(err)
  //   )
  // };

  /*--- utilities ---*/
}
