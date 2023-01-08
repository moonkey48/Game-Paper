import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useParams } from 'react-router-dom';
import CountContainer from '../components/count/CountContainer';
import Loading from '../components/loading/Loading';
import { AuthT } from '../types/authTypes';
import { DatabaseT } from '../types/databaseTypes';
import { RoomInfoT } from '../types/roomTypes';
import { UserCountListT } from '../types/userTypes';


type CountPageProps ={
    database:DatabaseT;
    auth:AuthT
}
const CountPage = ({database, auth}:CountPageProps) => {
    const location = useLocation()
    const params = useParams()
    const [cookies] = useCookies(['uid']);
    const [roomInfo, setRoomInfo] = useState<RoomInfoT>();
    const [pageState, setPageState] = useState<'loading' | 'error' | 'success'>('loading')
    const getRoomInfo = () => {
        const roomId = params.roomId as string
        database.getRoomInfo(cookies.uid, roomId, (data:any)=>setRoomInfo({
            roomGameType:data.RoomGameType,
            roomId:roomId,
            roomName:data.roomName,
            users:data.userList
        }))
    }
    useEffect(()=>{
        if(params){
            getRoomInfo()
        }
    },[])
    useEffect(()=>{
        if(roomInfo){
            setPageState('success')
        }
    },[roomInfo])

    return (
        <>
        { pageState === 'loading' && <Loading/> }
        { pageState === 'error' && <h1>error  when get info</h1> }
        { pageState === 'success' && <CountContainer auth={auth} database={database} roomInfo={roomInfo}/>}
        </>
    )
}

export default CountPage;