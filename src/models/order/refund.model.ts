export class Refund {
    ApplyId: number; //  申请Id
    OrderId: string;// 订单号
    Status: number;// 申请状态
    UserId: number;// 申请人Id，游客的话则为null
    UserName: string;// 申请人账号名
    Phone: string;// 申请人手机号
    ApplyTime: string;// 申请时间（需要改成时间字符串）
    Remark: string; // 申请处理备注
    ApplyRemark: string;// 申请说明
    Operator: number;// 操作员Id（未处理申请操作员信息为null）
    OperatorName: string; // 操作员帐号名
    OperateTime: string; // 处理时间（需要改成时间字符串）
}