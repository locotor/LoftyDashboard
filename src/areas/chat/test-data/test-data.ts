/* tslint:disable:max-line-length */
import User from '../../../models/user/user.model';
import Thread from '../../../models/thread/thread.model';
import Chat from '../../../models/chat/chat.model';
import { ChatService } from '../../../models/chat/chat.service';
import { UserService } from '../../../models/user/user.service';
import { ThreadService } from '../../../models/thread/thread.service';

import * as moment from 'moment';

// the person using the app us Juliet
const ladycap: User = new User("1", '成羊羊', 1, 'assets/images/avatars/female-avatar-2.png');
const echo: User = new User("2", '李婷婷', 1, 'assets/images/avatars/female-avatar-3.png');
const rev: User = new User("3", '张建英', 1, 'assets/images/avatars/female-avatar-4.png');
const wait: User = new User("4", '罗松林', 1, 'assets/images/avatars/male-avatar-1.png');

const tLadycap: Thread = new Thread(ladycap);
const tEcho: Thread = new Thread(echo);
const tRev: Thread = new Thread(rev);
const tWait: Thread = new Thread(wait);
let me: User

const initialMessages: Array<Chat> = [
    new Chat({
        author: ladycap,
        sentAt: moment().subtract(20, 'minutes').toDate(),
        text: '啊啦啦啦啦.',
        thread: tLadycap
    }),
    new Chat({
        author: echo,
        sentAt: moment().subtract(1, 'minutes').toDate(),
        text: `你发什么，我就回你什么`,
        thread: tEcho
    }),
    new Chat({
        author: rev,
        sentAt: moment().subtract(3, 'minutes').toDate(),
        text: `你发什么，我就反着发你什么`,
        thread: tRev
    }),
    new Chat({
        author: wait,
        sentAt: moment().subtract(4, 'minutes').toDate(),
        text: `你发个数字，我就按它延迟秒数回复你，比如你输个“3”看看`,
        thread: tWait
    }),
];

export class ChatExampleData {
    static init(chatsServcie: ChatService,
        threadsService: ThreadService,
        UsersService: UserService,
        currentUser: User): void {
        me = currentUser;
        // TODO make `messages` hot
        chatsServcie.chats.subscribe(() => ({}));
        UsersService.setCurrentUser(me);
        initialMessages.map((chat: Chat) => chatsServcie.addChat(chat));
        threadsService.setCurrentThread(tEcho);
        this.setupBots(chatsServcie);
    }

    static setupBots(chatsServcie: ChatService): void {

        // echo bot
        chatsServcie.ChatsForThreadUser(tEcho, echo)
            .forEach((chat: Chat): void => {
                chatsServcie.addChat(
                    new Chat({
                        author: echo,
                        text: chat.text,
                        thread: tEcho
                    })
                );
            },
            null);


        // reverse bot
        chatsServcie.ChatsForThreadUser(tRev, rev)
            .forEach((chat: Chat): void => {
                chatsServcie.addChat(
                    new Chat({
                        author: rev,
                        text: chat.text.split('').reverse().join(''),
                        thread: tRev
                    })
                );
            },
            null);

        // waiting bot
        chatsServcie.ChatsForThreadUser(tWait, wait)
            .forEach((chat: Chat): void => {

                let waitTime: number = parseInt(chat.text, 10);
                let reply: string;

                if (isNaN(waitTime)) {
                    waitTime = 0;
                    reply = `I didn\'t understand ${chat.text}. Try sending me a number`;
                } else {
                    reply = `I waited ${waitTime} seconds to send you this.`;
                }

                setTimeout(
                    () => {
                        chatsServcie.addChat(
                            new Chat({
                                author: wait,
                                text: reply,
                                thread: tWait
                            })
                        );
                    },
                    waitTime * 1000);
            },
            null);


    }
}
