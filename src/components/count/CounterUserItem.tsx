import React, { ChangeEvent, useState } from 'react';
import { MemberT } from '../../types/userTypes';
import s from './Counter.module.css';

type CounterUserItemProps = {
    uid:string;
    user:MemberT<number>;
    handlePlus:(uid:string)=>void;
    handleMinus:(uid:string)=>void;
    handleDeleteUser:(uid:string)=>void;
    handleChangeName:(memberId:string, changedName:string ) => void;
}
const CounterUserItem = ({uid, user, handlePlus, handleMinus, handleDeleteUser, handleChangeName}:CounterUserItemProps) => {
    const [memberName, setMemberName] = useState<string>(user.name)
    const onChangeNameInput = (e:ChangeEvent<HTMLInputElement>) =>{
        setMemberName(e.target.value)
        handleChangeName(uid ,e.target.value)
    }
    return (
        <li className={s.counterItem}>
                <input className={s.countMemberName} type="text" value={memberName} onChange={onChangeNameInput} />
            <div 
            className={s.countBox}>
                <h1>{user.payload}</h1>
            </div>
            <div className={s.buttonBox}>
                <button onClick={()=>handlePlus(uid)}>+</button>
                <button onClick={()=>handleMinus(uid)}>-</button>
            </div>
            <button onClick={()=>handleDeleteUser(uid)}>delete User</button>
        </li>
    )
}

export default CounterUserItem;