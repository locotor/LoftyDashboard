import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs/Observable";
import User from "models/user/user.model";
import Message from "models/message/message.model";
import { MessageService } from "../message.service";
import { elementAt } from 'rxjs/operator/elementAt';

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
    status: 0,
    isMessageScaning: false
  };
  /*---properties---*/
  public emailList = {
    messages: Array<Message>(),
    loading: false,
    pageSize: 10,
    totalAmount: 10,
    currentPage: 1
  };
  public smsList = {
    messages: Array<Message>(),
    loading: false,
    pageSize: 10,
    totalAmount: 0,
    currentPage: 1
  };
  public currentMessage: Message;

  /*---事件handler---*/
  ngOnInit (): void {
    this.getMessageList();
  }

  public getMessageList (): void {
    let pageSize: number,
      pageIndex: number;
    if (this.vm.type === 1) {
      pageSize = this.emailList.pageSize;
      pageIndex = this.emailList.currentPage;
    } else {
      pageSize = this.smsList.pageSize;
      pageIndex = this.smsList.currentPage;
    }
    this._apiService.getMessageList(
      this.vm.status,
      this.vm.type,
      pageIndex,
      pageSize).subscribe(
      (rspd: any) => {
        if (this.vm.type === 1) {
          this.emailList.messages = rspd.Data;
          this.emailList.totalAmount = rspd.Total;
        } else {
          this.smsList.messages = rspd.Data;
          this.smsList.totalAmount = rspd.Total;
        }
      },
      error => console.error("error: ", error)
      );
  }

  public handleTabChange (type: number): void {
    if (this.vm.type === type) {
      return;
    }
    this.vm.type = type;
    this.getMessageList();
  }

  public handleMessageClicked (message: Message): void {
    if (message.MessageStatus > 1) {
      this.currentMessage = message;
      return;
    }
    this.vm.isMessageScaning = true;
    this._apiService.scanMessage(message.Id).subscribe(
      resp => {
        this.currentMessage = message;
        this.vm.isMessageScaning = false;
      },
      err => console.error("error: ", err)
    );
  }

  /*--- utilities ---*/
}
