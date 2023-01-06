export type UserBasicT = {
    displayName:string
    email: string;
    uid:string
}
export type UserT = {
    name:string,
    id:string,
    count:number
}
export type UserListT = {
    [key:string]: UserT
}
