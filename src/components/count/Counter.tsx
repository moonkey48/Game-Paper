import { ChangeEvent, useState } from 'react';
import { RoomInfoT } from '../../types/roomTypes';
import { UserCountListT } from '../../types/userTypes';
import ColListContainer from '../flex-container/ColListContainer';
import RankingList from '../ranking/RankingList';
import s from './Counter.module.css';
import CounterUserItem from './CounterUserItem';

type CounterProps = {
    roomInfo:RoomInfoT | undefined;
    users:UserCountListT;
    handlePlus: (memberId:string) => void
    handleMinus: (memberId:string) => void
    handleChangeName: (memberId: string, changedName: string) => void;
    handleDeleteUser: (memberId: string) => void;
    handleAddUser:()=>void;
    handleReset:(memberId:string)=>void;
    changeRoomName:(newRoomName:string)=>void;
    deleteRoom:()=>void
}
const Counter = ({roomInfo,users, handlePlus, handleMinus, handleChangeName, handleDeleteUser,handleAddUser, changeRoomName, deleteRoom, handleReset}:CounterProps) => {
    const [roomName, setRoomName] = useState<string>(roomInfo?.roomName || 'default')
    const onChangeRoomName = (e:ChangeEvent<HTMLInputElement>) => {
        changeRoomName(e.target.value)
        setRoomName(e.target.value)
    }
    return (
        <div className={s.container}>
        <RankingList rankingProps={Object.keys(users).map(key=>{
            const name = users[key].name;
            const value = users[key].payload;
            return {
                name,
                value
            }
        })} />
        <ul className={s.counterList}>
        {
            Object.keys(users).map(key=>{
                return <CounterUserItem 
                key={key} 
                uid={key} 
                user={users[key]} 
                handlePlus={handlePlus}
                handleMinus={handleMinus}
                handleDeleteUser={handleDeleteUser}
                handleChangeName={handleChangeName}
                handleReset={handleReset}
                />
            }) 
        }
        </ul>
        <div className={s.editBox}>
            <ColListContainer>
                <input className={s.roomName} type="text" value={roomName} onChange={onChangeRoomName} />
                <button className={s.button} onClick={handleAddUser}>인원 추가</button>
                <button className={s.button} onClick={deleteRoom}>방 폭파</button>
            </ColListContainer>
        </div>
        </div>
    )
}

export default Counter;