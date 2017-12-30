import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { MessageService } from "../message.service";
import { NzMessageService } from "ng-zorro-antd";
import Message from "models/message/message.model";

@Component({
  selector: "message-window",
  templateUrl: "./message-window.component.html",
  styleUrls: ["./message-window.component.scss"]
})
export class MessageWindowComponent implements OnInit, OnChanges {
  @Input() currentMessage: Message;
  @Input() isContentLoading: boolean;
  public isReadOnly: boolean = false;
  constructor(
    private _apiService: MessageService,
    private _messageService: NzMessageService) { }

  // methods
  // tslint:disable-next-line:no-empty
  ngOnInit (): void {

  }
  ngOnChanges (): void {
    if (this.currentMessage && this.currentMessage.MessageStatus === 3) {
      this.isReadOnly = true;
    }
  }
  public FormatteDate (): Date {
    let DateString: string = this.currentMessage.CreateTime.slice(6, -3);
    return new Date(DateString);
  }
  onEnter (content: string): void {
    if (content) {
      this._sendMessage(content);
    } else {
      this._messageService.create("warning", "回复内容不能为空!");
    }
  }
  private _sendMessage (content: string): void {
    if (this.currentMessage.Type === 1) {
      this._apiService.sendEmail("lofty客服回复", content, this.currentMessage.TargetAddress).subscribe((rspd: any) => {
        if (rspd.IsSuccess) {
          this._messageService.create("success", "回复成功!");
          this.currentMessage = null;
        }
      });
    } else if (this.currentMessage.Type === 2) {
      let userName: string = this.currentMessage.User.name ? this.currentMessage.User.name : "游客";
      this._apiService.sendSMS(this.currentMessage.TargetAddress, userName)
        .subscribe((rspd: any) => {
          if (rspd.IsSuccess) {
            this._messageService.create("success", "回复成功!");
            this.currentMessage = null;
          }
        });
    }
  }
}
