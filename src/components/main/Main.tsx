import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { RoomGameType, RoomInfoT } from '../../types/roomTypes';
import { UserCountListT, UserT } from '../../types/userTypes';
import BoxMainGames from '../boxs/BoxMainGames';
import BoxMainRooms from '../boxs/boxMainRooms';
import LoadingBoxMainRooms from '../boxs/LoadingBoxMainRooms';
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
    const [cookies, ,removeCookie] = useCookies(['uid']);
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
            <section className={s.mainSection}>
                <LargeTitle message='기존 방' align='center'/>
            {
                roomsIn ?
                <ColListContainer>
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
                </ColListContainer>
                : <ColListContainer>
                    <LoadingBoxMainRooms/>
                    <LoadingBoxMainRooms/>
                </ColListContainer>
            }
            </section>
            <LargeTitle message='새로운 방 만들기' align='center' />
            <ColListContainer>
                <BoxMainGames  gameType='count' message='간단한 점수 Count를 도와드립니다.' handleClick={()=>setNewCountPage(true)} />
                <BoxMainGames enabled={false} gameType='table' message='여러명의 라운드 게임 테이블을 제공합니다.' handleClick={()=>setNewCountPage(true)} />
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