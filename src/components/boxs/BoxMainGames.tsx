import React from 'react';
import s from './boxs.module.css';

type BoxMainGamesProps = {
    handleClick: () => void
}
const BoxMainGames = ({handleClick}:BoxMainGamesProps) => {
    return (
        <li className={s.gameItem} onClick={handleClick}>
            <h3>Count Paper</h3>
            <p>간단한 점수 Count를 도와줍니다.</p>
        </li>
    )
}

export default BoxMainGames;