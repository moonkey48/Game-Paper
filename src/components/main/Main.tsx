import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { RoomGameType } from '../../types/roomTypes';
import { UserCountListT, UserT } from '../../types/userTypes';
import Modal from '../modal/Modal';

type MainProps = {
    auth:AuthT;
    database:DatabaseT;
}

const Main = ({auth,database}:MainProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newCountPage, setNewCountPage] = useState<boolean>(false);
    const [cookies,setCookie,removeCookie] = useCookies(['uid']);
    const [rooms, setRooms] = useState();

    const handleLogout = () => {
        auth.signOut();
    }
    const handleMakeNewRoom = (roomType:RoomGameType, roomMember: number) =>{
        if(roomType === 'count'){
            const roomId = `${Date.now()}`
            const users:UserCountListT = {}
            for(let i=0;i<roomMember;i++){
                const userId = `${Date.now()}_${i}`
                users[userId] = {
                    name:`user ${i}`,
                    id:userId,
                    payload:0
                }
            }
            handleMakeNewRoomDB(roomId, users,'count');
        }
    }

    const handleMakeNewRoomDB = (roomId: string, users:UserCountListT, roomType:RoomGameType, roomName?:string) => {
        database.createRoom(cookies.uid, roomId, users, roomType, ()=>handleRedirectToRoom(roomId), roomName)
    }

    const handleRedirectToRoom = (roomId:string) => {
        navigate('/main/count', {
            state:{
                roomId
            }
        })
    }
    const getUserInfo = () => {
        database.getOwnerInfo(location.state.uid, (data: UserT  | boolean )=>{
            if(data === false || data === true){
                console.log('no rooms')
            }else{
                console.log(data.rooms)
            }
        })
    }
    useEffect(()=>{
        getUserInfo();
    },[])
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
            <button onClick={()=>setNewCountPage(true)}>Count</button>
            {
            newCountPage && <Modal 
            message='방 인원수를 입력해주세요.'
            callback={(answer:number)=>handleMakeNewRoom("count", answer)}
            closeModal={()=>setNewCountPage(false)}
            />
            }
        </div>
    )
}

export default Main;