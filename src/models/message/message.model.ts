import User from "../user/user.model";
export default class Message {
    public Id: number;
    public Type: number;
    public User: User;
    public TargetAddress: string;
    public Remark: string;
    // 1未读,2未处理,3已处理
    public MessageStatus: number;
    public ReadTime?: Date;
    public ProcessTime?: Date;
    public CreateTime?: Date;
}