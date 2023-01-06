import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';

type MainProps = {
    auth:AuthT;
    database:DatabaseT;
}

const Main = ({auth,database}:MainProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies(['uid']);

    useEffect(()=>{
        console.log(location.state.uid)
    },[])
    const handleLogout = () => {
        auth.signOut();
    }
    useEffect(()=>{
        auth.onAuthChange((isChanged:boolean)=>{
            if(isChanged!){
                navigate('/')
                removeCookie('uid')
            }
        })
    },[auth])
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
            <h1>main page</h1>
        </div>
    )
}

export default Main;