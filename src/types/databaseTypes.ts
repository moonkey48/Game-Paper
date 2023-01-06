import { UserBasicT, UserT } from './userTypes';
export type DatabaseT = {
    setUser:(ownerId: string, roomId:string, userId:string, user:UserT)=>void
    getRoomInfo:(ownerId:string,roomId:string, callback:(data:any)=>void)=>void
    setNewLoginUser:(user:UserBasicT)=>void;
    getUserExist:(uid:string, callback:(isExist:boolean)=>void)=>void;
}