import React from 'react';
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

const TableContainer = ({database, auth, roomInfo, changeRoomName, deleteRoom}: TableContainerProps) => {
    return (
        <div className={s.container}>
            <table>
                <th>round</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <tr>
                    <td>user1</td>
                    <td>20</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>user2</td>
                    <td>10</td>
                    <td>40</td>
                </tr>
            </table>

        </div>
    )
}

export default TableContainer;