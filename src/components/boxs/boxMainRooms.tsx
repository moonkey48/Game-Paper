import { RoomInfoT } from '../../types/roomTypes';
import s from './boxs.module.css';

type BoxMainRooms = {
    roomId: string;
    room: RoomInfoT;
    handleClick: (roomId:string)=>void;
}
const BoxMainRooms = ({roomId, room, handleClick}:BoxMainRooms) => {
    return <li className={s.roomItem} onClick={()=>handleClick(roomId)}>
        <h3 className={s.roomName}>{room.roomName}</h3>
        <h4 className={s.roomType}>{room.roomGameType}</h4>
    </li>
}

export default BoxMainRooms;