import { RoomPriceConfig } from "./roomPriceConfig.model";
export class Room {
    RoomId?: number;
    ConfigString: string; // 必填
    Introduction?: string;
    PicUrl?: string;
    RoomName: string; // 必填
    Longitude?: number;
    Latitude?: number;
    Address?: string;
    Price: number;
    // 1民宿2别墅3酒店
    RoomTypeValue: number;
    RoomCount: number;
    Area: number;
    BedCount: number;
    DistrictId: number;
    AdultCount: number;
    ChildCount: number;
    IsBargainPrice: boolean;
    BargainPrice?: string;
    Description?: string;
    DescriptionPic?: string;
    RoomInfoDetail?: string;
    RoomInfoPic?: string;
    Photos?: string;
    DistrictDescription?: string;
    PriceConfigs?: RoomPriceConfig[];
}