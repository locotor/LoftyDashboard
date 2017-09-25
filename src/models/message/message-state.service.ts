import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Message from "./message.model"

const initialMessages: Message[] = [];
interface IMessageOperation extends Function {
    (messages: Message[]): Message[];
}

@Injectable()
export class MessageStateService implements OnInit {

    newMessages: Subject<Message[]> = new Subject<Message[]>();
    messages: Observable<Message[]>
    currentMessage: Subject<Message> = new BehaviorSubject<Message>(new Message());

    //action stream
    private _create: Subject<Message[]> = new Subject<Message[]>();
    private _markMessageAsRead: Subject<Message> = new Subject<Message>();
    private _markMessageAsProcess: Subject<Message> = new Subject<Message>();
    private _updates: Subject<any> = new Subject<any>();
    constructor() { };

    ngOnInit(): void {
        this.messages = this._updates.scan((Messages: Message[], operation: IMessageOperation) => {
            return operation(Messages);
        }, initialMessages).publishReplay(1).refCount();
        this.newMessages.subscribe(this._create);

        this._create.map((Messages: Message[]): IMessageOperation => {
            return (Messages: Message[]) => Messages.concat(Messages);
        }).subscribe(this._updates);

        this._markMessageAsRead.map((currentMessage: Message) => {
            return (Messages: Message[]) => {
                return Messages.map((Message: Message) => {
                    if (Message.Id == currentMessage.Id) {
                        Message.MessageStatus = 2
                    }
                    return Message;
                })
            }
        }).subscribe(this._updates);

        this._markMessageAsProcess.map((currentMessage: Message) => {
            return (Messages: Message[]) => {
                return Messages.map((Message: Message) => {
                    if (Message.Id == currentMessage.Id) {
                        Message.MessageStatus = 3
                    }
                    return Message;
                })
            }
        }).subscribe(this._updates);
    }

    public addMessages(messages: Message[]): void {
        this.newMessages.next(messages);
    };
    public markMessageAsRead(message: Message) {
        this._markMessageAsRead.next(message);
    }
    public markMessageAsProcess(message: Message) {
        this._markMessageAsProcess.next(message);
    }
}