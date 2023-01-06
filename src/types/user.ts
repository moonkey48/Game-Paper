export type UserT = {
    name:string,
    id:string,
    count:number
}
export type UserListT = {
    [key:string]: UserT
}
export type DatabaseT = {
    setUser:(ownerId: string, roomId:string, userId:string, user:UserT)=>void
    getRoomInfo:(ownerId:string,roomId:string, callback:(data:any)=>void)=>void
}