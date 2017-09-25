import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import Message from "../../../models/message/message.model";
import { MessageService } from "../message.service";

@Component({
  selector: 'message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent implements OnInit {
  @Input() currentMessage: Message
  constructor(
    private _messageService: MessageService,
    public snackBar: MdSnackBar,
  ) { }
  ngOnInit() {
  }
  onEnter(content: string): void {
    if (content) {
      this._sendMessage(content);
    } else {
      this.snackBar.open("输入内容不能为空", "关闭", {
        duration: 1000,
      });
    }
  }

  private _sendMessage(content: string): void {
    if (this.currentMessage.Type == 1) {
      this._messageService.sendEmail("lofty客服回复", content, this.currentMessage.TargetAddress);
    } else if (this.currentMessage.Type == 2) {
      this._messageService.sendSMS(this.currentMessage.TargetAddress, this.currentMessage.User.name);
    }
  }
}
