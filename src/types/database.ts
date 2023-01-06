import { UserT } from './user';
export type DatabaseT = {
    setUser:(ownerId: string, roomId:string, userId:string, user:UserT)=>void
    getRoomInfo:(ownerId:string,roomId:string, callback:(data:any)=>void)=>void
}