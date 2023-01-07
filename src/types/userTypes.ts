export type OwnerT = {
    displayName:string
    email: string;
    uid:string
}
export type UserT<T> = {
    name:string,
    id:string,
    payload:T
}
export type UserCountListT = {
    [key:string]: UserT<number>
}

