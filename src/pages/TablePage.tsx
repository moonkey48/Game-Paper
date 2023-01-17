import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Loading from '../components/loading/Loading';
import TableContainer from '../components/table/TableContainer';
import { AuthT } from '../types/authTypes';
import { DatabaseT } from '../types/databaseTypes';
import { RoomInfoT } from '../types/roomTypes';

type TablePageProps = {
    database: DatabaseT;
    auth:AuthT;
}
const test_roomInfo:RoomInfoT ={
    roomGameType:'table',
    roomId:'test',
    roomName: 'test_room',
    users:[
        {
            name:'austin', 
            total:50, 
            rounds:[
                {
                    value:30,
                    total:30
                },
                {
                    value:20,
                    total:50
                },
            ]
        },
        {
            name:'lizzy', 
            total:20, 
            rounds:[
                {
                    value:10,
                    total:10
                },
                {
                    value:10,
                    total:20
                },
            ]
        },
    ]
}
const TablePage = ({auth, database} : TablePageProps) => {
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
        console.log('handleNavigate')
        navigate('/main')
    }
    useEffect(()=>{
        if(params){
            getRoomInfo()
        }
        setRoomInfo(test_roomInfo)
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
        <TableContainer
        roomInfo={roomInfo}
        database={database}
        auth={auth}
        deleteRoom={deleteRoom}
        changeRoomName={changeRoomName}
        />
        <Footer/>
        </> }
        </>
    )
}

export default TablePage;