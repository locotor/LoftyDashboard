import uuid from "../../commons/utilities/uuid";
import User from "../user/user.model";
import Chat from "../chat/chat.model";

export default class Thread {
    id: string;
    user: User;
    lastChat: Chat;
    constructor(user?: User, id?: string) {
        this.user = user || null;
        this.id = id || uuid();
    }
}