import React, { useEffect, useState } from 'react';
import { AuthT } from '../../types/auth';
import { UserBasicT } from '../../types/user';

type LoginContainerProps = {
    auth:AuthT
}
const LoginContainer = ({auth}:LoginContainerProps) => {
    const [user, setUser] = useState<UserBasicT>()
    const checkUser = (loginInfo: UserBasicT) =>{
        if(loginInfo.uid){
            setUser(loginInfo)
        }
    }
    const handleSignIn = () => {
        auth.signInWithGoogle(checkUser)
    }
    return (
        <div>
            <button onClick={handleSignIn}>로그인</button>
            {user && <h1>{user.displayName} is login</h1> }
        </div>
    )
}

export default LoginContainer;