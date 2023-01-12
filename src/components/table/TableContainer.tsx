import React from 'react';
import { AuthT } from '../../types/authTypes';
import { DatabaseT } from '../../types/databaseTypes';
import { RoomInfoT } from '../../types/roomTypes';

type TableContainerProps = {
    roomInfo:RoomInfoT | undefined;
    database:DatabaseT;
    auth:AuthT;
    changeRoomName:(newRoomName:string)=>void;
    deleteRoom:()=>void
}

const TableContainer = ({database, auth, roomInfo, changeRoomName, deleteRoom}: TableContainerProps) => {
    return <h1>table container</h1>    
}

export default TableContainer;