import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { RoomInfoT } from '../../types/roomTypes';
import { MemberT, UserCountListT } from '../../types/userTypes';
import Counter from './Counter';

type CountContainerProps = {
    roomInfo:RoomInfoT | undefined;
    database:DatabaseT;
    auth:AuthT;
    changeRoomName:(newRoomName:string)=>void;
    deleteRoom:()=>void
}

const CountContainer = ({database, auth, roomInfo, changeRoomName, deleteRoom}:CountContainerProps) => {
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
            <Counter 
                roomInfo={roomInfo}
                users={users} 
                handlePlus={onPlus}
                handleMinus={onMinus}
                handleDeleteUser={onDeleteUser}
                handleChangeName={onChangeName}
                handleAddUser={onAddUser}
                changeRoomName={changeRoomName}
                deleteRoom={deleteRoom}
            />  
    )
}

export default CountContainer;