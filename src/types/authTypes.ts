import { UserBasicT } from './userTypes';

export type AuthT = {
    signInWithGoogle: (callback:(userInfo:UserBasicT)=>void) => void;
    signOut:()=>void;
    onAuthChange:(callback:(isChanged:boolean)=>void)=>void;
}