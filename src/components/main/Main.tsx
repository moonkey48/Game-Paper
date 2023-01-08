import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { RoomGameType, RoomInfoT } from '../../types/roomTypes';
import { UserCountListT, UserT } from '../../types/userTypes';
import BoxMainGames from '../boxs/BoxMainGames';
import BoxMainRooms from '../boxs/boxMainRooms';
import ColListContainer from '../flex-container/ColListContainer';
import RowListContainer from '../flex-container/RowListContainer';
import Modal from '../modal/Modal';
import LargeTitle from '../title/LargeTitle';
import s from './main.module.css';

type MainProps = {
    auth:AuthT;
    database:DatabaseT;
}

const Main = ({auth,database}:MainProps) => {
    const navigate = useNavigate();
    const [newCountPage, setNewCountPage] = useState<boolean>(false);
    const [cookies,setCookie,removeCookie] = useCookies(['uid']);
    const [roomsIn, setRoomsIn] = useState<{[key:string]:RoomInfoT}>();

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
        navigate(`/main/count/${roomId}`, {
            state:{
                roomId
            }
        })
    }
    const getUserInfo = () => {
        database.getOwnerInfo(cookies.uid, (data: UserT  | boolean )=>{
            if(data === false || data === true){
                console.log('no rooms')
            }else{
                setRoomsIn(data.rooms);
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
        <div className={s.mainContainer}>
            {
                roomsIn && 
                <section className={s.mainSection}>
                <LargeTitle message='기존 방' align='center'/>
                <RowListContainer>
                {
                    Object.keys(roomsIn).map(roomId=>{
                        return <BoxMainRooms
                        key={roomId}
                        roomId={roomId}
                        room={roomsIn[roomId]}
                        handleClick={handleRedirectToRoom}
                        />
                    })
                }
                </RowListContainer>
                </section>
            }

            <LargeTitle message='새로운 방 만들기' align='center' />
            <ColListContainer>
                <BoxMainGames handleClick={()=>setNewCountPage(true)} />
            </ColListContainer>


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