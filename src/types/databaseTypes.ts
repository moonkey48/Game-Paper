import { OwnerT, UserT } from './userTypes';
export type DatabaseT = {
    setUserCount:(ownerId: string, roomId:string, userId:string, user:UserT<number>)=>void
    getRoomInfo:(ownerId:string,roomId:string, callback:(data:any)=>void)=>void
    setNewLoginUser:(user:OwnerT)=>void;
    getUserExist:(uid:string, callback:(isExist:boolean)=>void)=>void;
}