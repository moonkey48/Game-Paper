import { RoomGameType } from './roomTypes';
import { MemberT, OwnerT, UserCountListT, UserT } from './userTypes';
export type DatabaseT = {
    setUserCount:(ownerId: string, roomId:string, userId:string, user:MemberT<number> | null)=>void
    getRoomInfo:(ownerId:string,roomId:string, callback:(data:any)=>void)=>void
    setNewLoginUser:(user:OwnerT)=>void;
    getOwnerInfo:(uid:string, callback:(data:UserT | boolean)=>void)=>void;
    createRoom:(ownerId:string,roomId:string, users:UserCountListT,roomType:RoomGameType, callback:()=>void, roomName?:string)=>void;
    changeRoomName:(ownerId:string, roomId:string, newRoomName:string)=>void
    deleteRoomDB:(ownerId:string, roomId:string)=>void
}