import { OwnerT } from './userTypes';

export type AuthT = {
    signInWithGoogle: (callback:(userInfo:OwnerT)=>void) => void;
    signOut:()=>void;
    onAuthChange:(callback:(isChanged:boolean)=>void)=>void;
}