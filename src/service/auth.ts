import { OwnerT } from '../types/userTypes';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';

export default class Auth {
    private auth:any;
    private provider:any;

    constructor(app:any){
        this.auth = getAuth(app);
        this.provider = new GoogleAuthProvider();
    }

    signInWithGoogle = async(callback:(loginInfo:OwnerT)=>void)=> {
        await signInWithPopup(this.auth, this.provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential!.accessToken;
                const user = result.user;
                console.log(user)
                callback({
                    displayName: user.displayName!,
                    email:user.email!,
                    uid:user.uid
                })
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(`${errorMessage}`)
                console.log('error on login')
            });
    }
    onAuthChange(callback:(isChanged:boolean)=>void){
        onAuthStateChanged(this.auth, (user)=>{
            if(user){
                callback(false)
            }else{
                callback(true)
            }
        })
    }
    signOut(){
        signOut(this.auth).then(()=> console.log('logout success'))
    }
}