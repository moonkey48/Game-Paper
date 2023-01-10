import React from 'react';
import { RankingItemT } from '../../types/rankingType';
import s from './ranking.module.css';

type RankingItemProps = {
    item:RankingItemT
}
const RankingItem = ({item}:RankingItemProps) => {
    return (
    <li>
            <h3>{item.name}</h3>
            <h3>{item.value}</h3>
    </li>
    )
}

export default RankingItem;