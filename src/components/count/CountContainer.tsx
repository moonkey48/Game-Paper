import React, { useEffect, useState } from 'react';
import { DatabaseT } from '../../types/databaseTypes';
import { UserListT, UserT } from '../../types/userTypes';
import Loading from '../loading/Loading';
import Counter from './Counter';

type CountContainerProps = {
    database:DatabaseT
}

const CountContainer = ({database}:CountContainerProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [roomId, setRoomId] = useState<string>('')
    const [users,setUsers] = useState<UserListT>({})
    const getRoomData = async() => {
        database.getRoomInfo("user1", "counter_room1", (data:any)=>{
            setRoomId(data.id)
            setIsLoading(false)
            setUsers(data.userList)
        })
    }
    useEffect(()=>{
        getRoomData()
    },[])

    const onPlus = (id: string) =>{
        const updated = {...users};
        updated[id].count = updated[id].count + 1;
        setUsers(updated)
        changeDatabaseUser(id, updated[id])
    }
    const onMinus = (id:string) => {
        const updated = {...users};
        updated[id].count = updated[id].count - 1;
        setUsers(updated)
        changeDatabaseUser(id, updated[id])
    }
    const changeDatabaseUser = (userId:string, user:UserT) => {
        database.setUser("user1", roomId, userId, user)
    }
    return (
        <>
        {
        isLoading ?
        <Loading/> :
        <Counter 
            users={users} 
            handlePlus={onPlus}
            handleMinus={onMinus}
        /> 
        }
        </>
    )
}

export default CountContainer;