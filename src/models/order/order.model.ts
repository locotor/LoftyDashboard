export class Order {
    OrderId: string;
    RoomId: number;
    PayTimeString: string;
    Amount: number;
    PhoneNumber: string;
    // 1未付款，2已付款，3退款
    Status: number;
    UserId: number;
    AliPayOrderId: string;
    StartTimeString: string;
    EndTimeString: string;
}
