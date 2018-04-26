class Trip {
  time: string;
  Discription: string;
}

export class Tour {
  // 必填项
  Id: string;
  ParentId: string;
  Name: string;
  AdultPrice: number;
  ChildPrice: number;
  // 可选项
  CoverImage?: string;
  Discription?: string;
  Images?: string; // url地址，逗号分隔
  Tips?: string;
  TransportationCost?: string; // 旅行花费列表id，逗号分隔
  Trip: Trip[]; // 行程列表的json
}