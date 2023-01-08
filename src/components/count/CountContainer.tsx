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

    const onPlus = (memberId: string) =>{
        const updated = {...users};
        updated[memberId].payload = updated[memberId].payload + 1;
        setUsers(updated)
        changeDatabaseUser(memberId, updated[memberId])
    }
    const onMinus = (memberId:string) => {
        const updated = {...users};
        updated[memberId].payload = updated[memberId].payload - 1;
        setUsers(updated)
        changeDatabaseUser(memberId, updated[memberId])
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
    const onAddUser = () => {
        let updated = {...users}
        const newUserId = `${Date.now()}_${Math.round(Math.random()*100)}`;
        updated[newUserId] = {
            name:'user_name_default',
            id:newUserId,
            payload:0
        }
        setUsers(updated);
        changeDatabaseUser(newUserId,  updated[newUserId])
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
            <button onClick={onAddUser}>add new user</button>
        </>
    )
}

export default CountContainer;