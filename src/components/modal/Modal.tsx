import React, { ChangeEvent, useState } from 'react';
import s from './modal.module.css';

type ModalProps = {
    message:string;
    callback: (answer:number)=>void;
    closeModal: ()=>void
}
const Modal = ({message, callback,closeModal}:ModalProps) => {
    const [roomMemberCount, setRoomMemberCount] = useState<number>(1)
    const [error, setError] = useState<string>('')
    const handleCancle = () => {
        closeModal();
    }
    const handleSubmit = () => {
        if(roomMemberCount<1){
            setError('방 인원은 최소 1명이상이어야 합니다.')
        }else{
            callback(roomMemberCount)
        }
    }
     return (
        <div className={s.container}>
            <div className={s.modal}>
                <h3 className={s.title}>{message}</h3>
                <input  className={s.input} type="number" value={roomMemberCount} onChange={(e:ChangeEvent<HTMLInputElement>)=>setRoomMemberCount(Number(e.target.value))} />
                <h5 className={s.error}>{error}</h5>
                <div className={s.buttonBox}>
                    <button className={`${s.cancelBtn} ${s.button}`} onClick={handleCancle}>취소</button>
                    <button className={`${s.completeBtn} ${s.button}`} onClick={handleSubmit}>완료</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;