import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { RoomInfoT } from '../../types/roomTypes';
import { MemberT, UserCountListT, UserT } from '../../types/userTypes';
import Loading from '../loading/Loading';
import Counter from './Counter';

type CountContainerProps = {
    roomInfo:RoomInfoT | undefined;
    database:DatabaseT;
    auth:AuthT
}

const CountContainer = ({database, auth, roomInfo}:CountContainerProps) => {
    const [cookies] = useCookies(['uid'])

    const [roomId, setRoomId] = useState<string>('')
    const [users,setUsers] = useState<UserCountListT>({})

    useEffect(()=>{
        if(roomInfo !== undefined){
            setRoomId(roomInfo.roomId)
            setUsers(roomInfo.users);
        }
    },[])

    const onPlus = (id: string) =>{
        const updated = {...users};
        updated[id].payload = updated[id].payload + 1;
        setUsers(updated)
        changeDatabaseUser(id, updated[id])
    }
    const onMinus = (id:string) => {
        const updated = {...users};
        updated[id].payload = updated[id].payload - 1;
        setUsers(updated)
        changeDatabaseUser(id, updated[id])
    }
    const onChangeName = (memberId:string, changedName:string) => {
        const updated = {...users};
        updated[memberId].name = changedName || 'default name';
        setUsers(updated);
        changeDatabaseUser(memberId, updated[memberId]);
    }
    const onDeleteUser = (memberId:string) => {
        let updated: UserCountListT = {}
        Object.keys(users).forEach(uid=>{
            if(uid!==memberId){
                updated[uid] = users[uid];
            }
        })
        setUsers(updated)
        changeDatabaseUser(memberId, null)
    } 
    const changeDatabaseUser = (userId:string, user:MemberT<number> | null) => {
        database.setUserCount(cookies.uid, roomId, userId, user)
    }
    return (
        <>
            <h1>{roomInfo?.roomName}</h1>
            <Counter 
                users={users} 
                handlePlus={onPlus}
                handleMinus={onMinus}
                handleDeleteUser={onDeleteUser}
                handleChangeName={onChangeName}
            /> 
        </>
    )
}

export default CountContainer;