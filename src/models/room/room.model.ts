export class Room {
    RoomId: Number;
    RoomName: String;
    Longitude: Number;
    Latitude: Number;
    Price: Number;
    // 1民宿2别墅3酒店
    RoomTypeValue: Number;
    RoomCount: Number;
    Area: Number;
    BedCount: Number;
    District: String;
    AdultCount: Number;
    ChildCount: Number;
    IsBargainPrice: Boolean;
    BargainPrice?: String;
    Description?: String;
    DescriptionPic?: String;
    RoomInfoDetail?: String;
    RoomInfoPic?: String;
    Photos?: String;
    Introduction?: String;
    DistrictDescription?: String;
    PicUrl?: String;
    Address?: String;
}