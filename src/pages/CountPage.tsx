import React, { useEffect } from 'react';
import CountContainer from '../components/count/CountContainer';
import { DatabaseT } from '../types/user';

type CountPageProps ={
    database:DatabaseT
}
const CountPage = ({database}:CountPageProps) => {
    const getRoomData = async() => {
        database.getRoomInfo("user1", "counter_room1", (data:any)=>console.log(data))
    }
    useEffect(()=>{
        getRoomData()
    },[])
    return (
        <CountContainer/>
    )
}

export default CountPage;