import { RoomPriceConfig } from "./roomPriceConfig.model";
export class Room {
    // 必填项
    ConfigString: string;
    RoomName: string;
    BasePrice: number;
    RoomTypeValue: number;// 1民宿2别墅3酒店
    RoomCount: number;
    Area: number;
    BedCount: number;
    DistrictId: number;
    AdultCount: number;
    ChildCount: number;
    IsBargainPrice: boolean;
    // 可空项
    RoomId?: number;
    Introduction?: string;
    PicUrl?: string;
    Longitude?: number;
    Latitude?: number;
    Address?: string;
    BargainPrice?: string;
    Description?: string;
    DescriptionPic?: string;
    RoomInfoDetail?: string;
    RoomInfoPic?: string;
    Photos?: string;
    DistrictDescription?: string;
    PriceConfigs?: RoomPriceConfig[];
}