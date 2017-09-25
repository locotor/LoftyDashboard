import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChatService } from '../chat/chat.service';
import Thread from './thread.model';
import Chat from '../chat/chat.model';
import * as _ from 'lodash-es';

@Injectable()
export class ThreadService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  currentThreadMessages: Observable<Chat[]>;

  constructor(public chatService: ChatService) {
    this.threads = chatService.chats.map((chats: Chat[]) => {
      const threads: { [key: string]: Thread } = {};
      chats.map((message: Chat) => {
        threads[message.thread.user.userId] = threads[message.thread.user.userId] || message.thread;
        const messagesThread: Thread = threads[message.thread.user.userId];
        if (!messagesThread.lastChat || messagesThread.lastChat.sentAt < message.sentAt) {
          messagesThread.lastChat = message;
        }
      });
      return threads;
    });

    this.orderedThreads = this.threads.map((threadGroups: { [key: string]: Thread }) => {
      const threads: Thread[] = _.values(threadGroups);
      return _.sortBy(threads, (t: Thread) => t.lastChat.sentAt).reverse();
    });

    this.currentThreadMessages = this.currentThread.combineLatest(chatService.chats,
      (currentThread: Thread, chat: Chat[]) => {
        if (currentThread && chat.length > 0) {
          return _.chain(chat).filter((message: Chat) =>
            (message.thread.user.userId === currentThread.user.userId)).map((message: Chat) => {
              message.isRead = true;
              return message;
            }).value();
        } else {
          return [];
        }
      });

    this.currentThread.subscribe(this.chatService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}