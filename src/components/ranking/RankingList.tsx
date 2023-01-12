import React, { useEffect, useState } from 'react';
import { RankingItemT } from '../../types/rankingType';
import RankingItem from './RankingItem';
import s from './ranking.module.css';

/**
 * {[userName:string]:value}를 받아서
 * payload에 있는 값을 비교해서 가장 높은 값부터 낮은 순으로 배열을 전달해주는
 */
type RankingListProps = {
    rankingProps: Array<RankingItemT>
    
}
const RankingList = ({rankingProps}:RankingListProps) => {
    const [rankingList, setRankingList] = useState<RankingItemT[]>([])

    const checkRanking = () =>{
        setRankingList(rankingProps.sort((a,b)=>b.value - a.value))
    }

    useEffect(()=>{
        checkRanking();
    },[rankingProps])
    
    return (
        <ul className={s.rankingList}>
            {
                rankingList.map((item:RankingItemT,index)=>{
                    return <RankingItem key={item.name} item={item} ranking={index} />
                })
            }
        </ul>
    )
}

export default RankingList;