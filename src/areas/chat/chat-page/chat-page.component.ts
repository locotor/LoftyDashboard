import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatService } from "../chat.service";
import { AppContextService } from "../../../root/app-context.service";


@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(
    private _appContext: AppContextService,
    private _apiService: ChatService
  ) { }

  ngOnInit() {
    // console.log($)
  }
}
