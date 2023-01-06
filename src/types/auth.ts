import { UserBasicT } from './user';

export type AuthT = {
    signInWithGoogle: (callback:(userInfo:UserBasicT)=>void) => void;
}