### Email:

	url:Public/SendEmail
	data:EmailDto
	{
		Subject { get; set; }//主题
	    MessageBody { get; set; }//邮件正文
		Html { get; set; }//邮件内嵌html
	    To { get; set; }//目标地址
		FileBase64 { get; set; }//上传的附件		
	}
	result:bool	

### SMS:	

	url:Public/SendPhoneMessage
	data:List<SmsDto>
	{
		new SmsDto
		{
			Number { get; set; }//手机号
			string Name { get; set; }//目标名字
		}
	}
	result:bool	

### 获取在线客服人员

```c#
url:Account/GetOnlineAdmin
data:
	userId:long;
	name:string;
	avatar:string;
```

### chat:

	signalr
	发送消息:SendMessage("消息体","发送目标的userId(如果为游客则传-1)","游客sessionId(如果不是游客则传空字符串)");
	接收消息:ReceiveChatMessage(
		new LoftyChatMessage
		{
			public string MessageId { get; set; }
			public string SenderSessionId { get; set; }
			public string MessageBody { get; set; }
			public long SenderId { get; set; }
			public DateTime SendTime { get; set; }
			public bool IsRead { get; set; }
		})
	获取历史聊天人员:
		url:Account/GetLastChatUsers
		data:int pageIndex, int pageSize
		result:List<ChatUserDto>
		{
			public long UserId  {get;set;}
			public string UserName { get;set;}
			public string UserAccount { get;set;}
			public string HeadImageUrl { get;set;}
			public int NotReadCount { get;set;}
		}
	保存聊天记录(收到消息后需要保存)：
		url:Account/SaveChatMessage
		data:long sender, string msg, long targetId
		result:bool
	获取单个聊天详情:
		url:Account/GetChatMessage
		data:long targetId, int pageIndex, int pageSize
		result:List<LoftyChatMessage>
		{
			new LoftyChatMessage
			{
				public string MessageId { get; set; }
				public string SenderSessionId { get; set; }
				public string MessageBody { get; set; }
				public long SenderId { get; set; }
				public DateTime SendTime { get; set; }
				public bool IsRead { get; set; }
			}
		}

### 留言：

	获取：
		页码：(total + pageSize - 1) / pageSize
		url:Message/GetMessage
		data:{MessageStatus? status, MessageType? type, int pageInde, int pageSize}
		result:{
				Data = 
				{
					
					public long Id { get; set; }//留言Id
					public long? UserId { get; set; }//留言人(如果是游客则为空)
					public MessageType Type { get; set; }//留言类型(邮箱地址/电话号码)
					public string TargetAddress { get; set; }//联系方式的具体内容(邮箱或手机号)
					public string Remark { get; set; }//备注
					public MessageStatus MessageStatus { get; set; }
					//本条留言的处理状态(未读、已读未处理、已处理)
					public DateTime? ReadTime { get; set; }
					public DateTime? ProcessTime { get; set; }
					public DateTime CreateTime { get; set; }
				},
				Total = count
			}
	创建留言：  
		url:Message/CreateMessage
		data:{long? userId, string target, MessageType type, string remark}
		result:bool
		说明:target是电话号码或email地址；type:1为邮件，2为电话
	阅读留言:	
		url:Message/ScanMessage
		data: long id
		result:bool

### 个人信息：

	获取个人信息:
		url:Account/GetUserInfoById
		data:long uid
		result:
		{
			public long UserId { get; set; }
			public string Name { get; set; }
			public int Type { get; set; }
			public string Account { get; set; }
			public string Email { get; set; }
			public string HeadImageUrl { get; set; }
			public string PhoneNumber { get; set; }
		}
	更改个人信息:
		url:Account/ChangeInfo
		data:
			{
			    public long UserId { get; set; }
				public string Name { get; set; }
				public string PassWord { get; set; }
				public int Type { get; set; }
				[Required(ErrorMessage ="账户名是必须的")]
				public string Account { get; set; }
				public string Email { get; set; }
				public string HeadImageUrl { get; set; }
				public string PhoneNumber { get; set; }
			}
		result:bool
## 搜索：

​	![img](file:///C:\Users\locot\Documents\Tencent Files\375522067\Image\Group\`UT1S73%]%O7]OC}DZ9]MTS.png)

