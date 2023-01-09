import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import CountContainer from '../components/count/CountContainer';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Loading from '../components/loading/Loading';
import { AuthT } from '../types/authTypes';
import { DatabaseT } from '../types/databaseTypes';
import { RoomInfoT } from '../types/roomTypes';


type CountPageProps ={
    database:DatabaseT;
    auth:AuthT
}
const CountPage = ({database, auth}:CountPageProps) => {
    const params = useParams()
    const navigate = useNavigate()
    const [cookies, ,removeCookie] = useCookies(['uid']);
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
    const changeRoomName = (newRoomName:string) =>{
        if(roomInfo){
            setRoomInfo(roomInfo=>{
                roomInfo!.roomName = newRoomName
                return roomInfo
            });
            database.changeRoomName(cookies.uid, roomInfo!.roomId, newRoomName);
        }
    }
    const deleteRoom = () =>{
        if(roomInfo?.roomId){
            database.deleteRoomDB(cookies.uid, roomInfo.roomId);
            handleNavigate()
        }
    }
    const handleNavigate = ()=>{
        navigate('/main')
    }
    useEffect(()=>{
        if(params){
            getRoomInfo()
        }
    },[params])
    
    useEffect(()=>{
        if(roomInfo){
            setPageState('success')
        }
    },[roomInfo])

    useEffect(()=>{
        auth.onAuthChange((isChanged:boolean)=>{
            if(isChanged!){
                navigate('/')
                removeCookie('uid')
            }
        })
    },[auth])

    return (
        <>
        { pageState === 'loading' && <Loading/> }
        { pageState === 'error' && <h1>error  when get info</h1> }
        { pageState === 'success' && <>
        <Header auth={auth} handleNavigate={handleNavigate} handleNavigateTo='메인으로'/>
        <CountContainer 
        auth={auth} 
        database={database} 
        roomInfo={roomInfo}
        deleteRoom={deleteRoom}
        changeRoomName={changeRoomName}
        />
        <Footer/>
        </> }
        </>
    )
}

export default CountPage;