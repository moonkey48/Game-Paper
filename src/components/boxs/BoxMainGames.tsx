import React from 'react';
import s from './boxs.module.css';

type BoxMainGamesProps = {
    handleClick: () => void
}
const BoxMainGames = ({handleClick}:BoxMainGamesProps) => {
    return (
        <li className={s.gameItem} onClick={handleClick}>
            <h3 className={s.gameName}>Game Type : Count</h3>
            <h4 className={s.gameDesc}>간단한 점수 Count를 도와드립니다.</h4>
        </li>
    )
}

export default BoxMainGames;