export type RoomGameType = 'count' | 'table';
export type RoomInfoT = {
    roomGameType:RoomGameType;
    roomId:string;
    roomName:string;
    users:any;
}