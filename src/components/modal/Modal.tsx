import React, { ChangeEvent, useState } from 'react';

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
        <div>
            <h3>{message}</h3>
            <input type="number" value={roomMemberCount} onChange={(e:ChangeEvent<HTMLInputElement>)=>setRoomMemberCount(Number(e.target.value))} />
            <button onClick={handleCancle}>취소</button>
            <button onClick={handleSubmit}>완료</button>
            <h3>{error}</h3>
        </div>
    )
}

export default Modal;