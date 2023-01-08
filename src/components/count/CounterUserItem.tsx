import React, { ChangeEvent, useState } from 'react';
import { MemberT } from '../../types/userTypes';
import s from './CounterUser.module.css';

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
                <h1 className={s.countValue}>{user.payload}</h1>
            </div>
            <div className={s.buttonBox}>
                <button className={s.countBtn} onClick={()=>handlePlus(uid)}>+</button>
                <button className={s.countBtn} onClick={()=>handleMinus(uid)}>-</button>
            </div>
            <button className={s.deleteBtn} onClick={()=>handleDeleteUser(uid)}>delete</button>
        </li>
    )
}

export default CounterUserItem;