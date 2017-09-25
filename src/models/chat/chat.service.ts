import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import User from '../user/user.model';
import Thread from '../thread/thread.model';
import Chat from '../chat/chat.model';

const initialChats: Chat[] = [];

interface IChatsOperation extends Function {
  (Chats: Chat[]): Chat[];
}

@Injectable()
export class ChatService {
  // data streams
  newChats: Subject<Chat> = new Subject<Chat>();
  chats: Observable<Chat[]>;
  markThreadAsRead: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Chat> = new Subject<Chat>();
  updates: Subject<any> = new Subject<any>();

  constructor() {
    this.chats = this.updates.scan((Chats: Chat[], operation: IChatsOperation) => {
      return operation(Chats);
    }, initialChats).publishReplay(1).refCount();

    this.create.map((Chat: Chat): IChatsOperation => {
      return (Chats: Chat[]) => Chats.concat(Chat);
    }).subscribe(this.updates);

    this.newChats.subscribe(this.create);

    this.markThreadAsRead.map((thread: Thread) => {
      return (Chats: Chat[]) => {
        return Chats.map((Chat: Chat) => {
          if (Chat.thread.user.userId === thread.user.userId) {
            Chat.isRead = true;
          }
          return Chat;
        });
      } 
    }).subscribe(this.updates);
  }

  // an imperative function call to this action stream
  addChat(Chat: Chat): void {
    this.newChats.next(Chat);
  }

  ChatsForThreadUser(thread: Thread, user: User): Observable<Chat> {
    return this.newChats.filter((Chat: Chat) => {
      return (Chat.thread.user.userId === thread.user.userId) && (Chat.author.userId !== user.userId);
    });
  }
}
