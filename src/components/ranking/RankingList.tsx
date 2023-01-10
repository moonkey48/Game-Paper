import React, { useEffect, useState } from 'react';
import { RankingItemT } from '../../types/rankingType';
import RankingItem from './RankingItem';

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
        <ul>
            {
                rankingList.map((item:RankingItemT)=>{
                    return <RankingItem key={item.name} item={item} />
                })
            }
        </ul>
    )
}

export default RankingList;