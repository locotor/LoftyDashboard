import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})
export class MessageTableComponent implements OnInit {
  public rows = [
    {
      用户名: 'testing1',
      发送时间: "2017-11-11",
      内容: 'hello',
      已读: false,
      已处理: false
    },
    {
      用户名: 'testing2',
      发送时间: "2017-11-11",
      内容: 'hello,hello,hello,hello',
      已读: false,
      已处理: false
    },
    {
      用户名: 'testing3',
      发送时间: "2017-11-11",
      内容: 'hello',
      已读: false,
      已处理: false
    },
    {
      用户名: 'testing3',
      发送时间: "2017-11-11",
      内容: 'hello',
      已读: false,
      已处理: false
    },
    {
      用户名: 'testing3',
      发送时间: "2017-11-11",
      内容: 'hello',
      已读: false,
      已处理: false
    },
    {
      用户名: 'testing3',
      发送时间: "2017-11-11",
      内容: 'hello',
      已读: false,
      已处理: false
    },
  ];
  public loadingIndicator:boolean = false;
  public columns = [
    { prop: '用户名' },
    { prop: '发送时间' },
    { prop: '内容' },
    { prop: "已读" },
    { prop: "已处理" }
  ];

  ngOnInit() {
  }
}
