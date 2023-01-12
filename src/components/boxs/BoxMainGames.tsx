import React from 'react';
import s from './boxs.module.css';

type BoxMainGamesProps = {
    handleClick: () => void;
    gameType:'count' | 'table';
    message:string;
    enabled?: boolean
}
const BoxMainGames = ({handleClick, gameType, message,enabled = true}:BoxMainGamesProps) => {
    return (
        <li className={`${s.gameItem} ${enabled ? '' : s.locked}`} onClick={()=>{
            if(enabled){
                handleClick()
            }
        }}>
            <h3 className={s.gameName}>Game Type : {gameType}</h3>
            <h4 className={s.gameDesc}>{enabled ? message : '현재 준비중입니다:)'}</h4>
        </li>
    )
}

export default BoxMainGames;