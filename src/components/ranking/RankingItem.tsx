import React from 'react';
import { RankingItemT } from '../../types/rankingType';
import s from './ranking.module.css';

type RankingItemProps = {
    item:RankingItemT;
    ranking:number
}
const RankingItem = ({item,ranking}:RankingItemProps) => {
    return (
    <li key={item.name} className={`${s.rankingItem} ${ranking === 0 && s.first}`}>
            <h3 className={s.ranking}>{ranking+1}위</h3>
            <h3 className={s.rankingName}>{ranking===0 ? '🥇' : ranking === 1 ? '🥈' : ranking === 2 ? '🥉' : ''} {item.name}</h3>
            <h3 className={s.rankingValue}>{item.value}점</h3>
    </li>
    )
}

export default RankingItem;