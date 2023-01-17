import React, { useEffect, useState } from 'react';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { RoomInfoT } from '../../types/roomTypes';
import s from './table.module.css';

type TableContainerProps = {
    roomInfo:RoomInfoT | undefined;
    database:DatabaseT;
    auth:AuthT;
    changeRoomName:(newRoomName:string)=>void;
    deleteRoom:()=>void
}
type RoundT = {
    value: number;
    total: number
}
type UserTableT = {
    name:string
    total:number
    rounds: RoundT[]
}

const TableContainer = ({database, auth, roomInfo, changeRoomName, deleteRoom}: TableContainerProps) => {
    const [roundLength, setRoundLength] = useState<number>(1);
    useEffect(()=>{
        if(roomInfo){
            setRoundLength(roomInfo.users[0].rounds.length)
        }
    },[])

    return (
        <div className={s.container}>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>round</th>
                        <th>1</th>
                        <th>2</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    roomInfo && roomInfo.users.map((user:UserTableT)=>{
                        return <tr>
                            <td>
                                <input type="text" value={user.name} />
                            </td>
                            {user.rounds.map((round:RoundT)=>{
                                return <td>
                                    <input type="text" value={round.value} />
                                </td>
                            })}
                        </tr>
                    })   
                    }
                </tbody>
            </table>

        </div>
    )
}

export default TableContainer;