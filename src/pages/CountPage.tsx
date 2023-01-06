import React, { useEffect } from 'react';
import CountContainer from '../components/count/CountContainer';
import { DatabaseT } from '../types/databaseTypes';


type CountPageProps ={
    database:DatabaseT
}
const CountPage = ({database}:CountPageProps) => {
    return (
        <CountContainer database={database}/>
    )
}

export default CountPage;