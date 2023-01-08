import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { OwnerT, UserT } from '../../types/userTypes';

type LoginContainerProps = {
    auth:AuthT;
    database:DatabaseT
}
const LoginContainer = ({auth,database}:LoginContainerProps) => {
    const [user, setUser] = useState<OwnerT>()
    const [cookie, setCookie] = useCookies(['uid'])
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        auth.signInWithGoogle(checkUserInfo)
    }

    const checkUserInfo = (loginInfo: OwnerT) =>{
        if(loginInfo.uid){
            setUser(loginInfo)
            setUserCookie(loginInfo.uid)
            checkUserOnDB(loginInfo)
        }else{
            setError('로그인 정보를 확인하는데 문제가 발생했습니다. 다른 아이디로 시도해주세요.')
        }
    }
    const checkUserOnDB = (loginInfo:OwnerT) => {
        database.getOwnerInfo(loginInfo.uid, (data: UserT  | boolean )=>{
            if(data){
                handleRedirect(loginInfo.uid)
            }else if(data === false){
                setUserOnDB(loginInfo)
                handleRedirect(loginInfo.uid)
            }
        })
    }
    const setUserCookie = (uid:string) =>{
        const expires =  new Date()
        expires.setTime(Date.now()+ 1000*60*60*24*3)
        setCookie('uid', uid, {
            path:'/',
            expires
        })
    }
    const handleRedirect = (uid:string) => {
        navigate('/main', {
            state: {
                uid
            }
        })
    }
    
    const setUserOnDB = (user:OwnerT) => {
        database.setNewLoginUser(user);
    }
    useEffect(()=>{
        if(cookie.uid){
            handleRedirect(cookie.uid)
        }
    },[cookie.uid, handleRedirect])
    
    return (
        <div>
            <h3>{error}</h3>
            <button onClick={handleSignIn}>로그인</button>
            {user && <h1>{user.displayName} is login</h1> }
        </div>
    )
}

export default LoginContainer;