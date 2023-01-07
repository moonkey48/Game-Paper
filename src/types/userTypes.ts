import { RoomInfoT } from './roomTypes';

export type OwnerT = {
    displayName:string
    email: string;
    uid:string
}
export type UserT = {
    name:string,
    id:string,
    rooms?: {
        [key:string]: RoomInfoT
    }
}
export type MemberT<T> = {
    name:string,
    id:string,
    payload:T
}
export type UserCountListT = {
    [key:string]: MemberT<number>
}

