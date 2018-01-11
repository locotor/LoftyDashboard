export default class User {
    public userId: number;
    public account: string;
    public type: number;
    public name?: string;
    public email?: string;
    public headImageUrl?: string;
    public phoneNumber?: string;

    constructor(
        userId: number,
        account: string,
        type: number,
        headImageUrl?: string,
        name?: string,
        email?: string,
        phoneNumber?: string,
    ) {
        this.userId = userId;
        this.account = account;
        this.type = type;
        this.name = name || "";
        this.email = email || "";
        this.headImageUrl = headImageUrl || "";
        this.phoneNumber = phoneNumber || "";
    }
}