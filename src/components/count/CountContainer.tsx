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
    const changeDatabaseUser = (userId:string, user:MemberT<number>) => {
        database.setUserCount(cookies.uid, roomId, userId, user)
    }
    return (
        <>
            <Counter 
                users={users} 
                handlePlus={onPlus}
                handleMinus={onMinus}
            /> 
        </>
    )
}

export default CountContainer;