import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";;
import User from '../../../models/user/user.model';
import Message from '../../../models/message/message.model';
import { MessageService } from "../message.service";

const yang: User = new User("1", '成羊羊', 1, 'assets/images/avatars/female-avatar-2.png');
const ting: User = new User("2", '李婷婷', 1, 'assets/images/avatars/female-avatar-3.png');
const yin: User = new User("3", '张建英', 1, 'assets/images/avatars/female-avatar-4.png');
const lin: User = new User("4", '罗松林', 1, 'assets/images/avatars/male-avatar-1.png');

@Component({
  selector: 'message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent implements OnInit {
  /*---properties---*/
  public emailList = {
    messages: Array<Message>(),
    type: 1,
    status: 1,
    totalPage: 1,
    totalAmount: 0,
    currentPage: 1
  }
  public smsList = {
    messages: Array<Message>(),
    type: 2,
    status: 1,
    totalPage: 1,
    totalAmount: 0,
    currentPage: 1
  }
  public currentMessage: Message;
  constructor() { };



  /*---事件handler---*/
  ngOnInit() {
    /*-- for test --*/
    for (let i = 1; i <= 20; i++) {
      this.emailList.messages.push({
        Id:i,
        User:yang,
        Type:1,
        TargetAddress:"XXXXXXX",
        Remark:"content",
        MessageStatus:1
      });
      this.smsList.messages.push({
        Id:i,
        User:yang,
        Type:2,
        TargetAddress:"XXXXXXX",
        Remark:"content",
        MessageStatus:1
      });
    }

    // this._messageService.getMessageList(
    //   this.emailList.status,
    //   this.emailList.type, 1, 10).subscribe(
    //   (resp: any) => {
    //     console.log("email message list: ", <any>resp.Data)
    //     this.emailList.messageList = resp.Date;
    //     this.emailList.totalAmount = resp.Total;
    //   },
    //   error => console.error("error: ", error)
    //   );

    // this._messageService.getMessageList(
    //   this.smsList.status,
    //   this.smsList.type, 1, 10).subscribe(
    //   resp => console.log("resp: ", resp),
    //   error => console.error("error: ", error)
    //   );
  };

  // onMessageClicked(message, envent) {
  //   this._messageService.scanMessage(message.Id).subscribe(
  //     resp => this.currentMessage = message,
  //     err => console.error(err)
  //   )
  // };

  /*--- utilities ---*/
}
