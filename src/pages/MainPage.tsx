import React from 'react';
import Main from '../components/main/Main';
import { AuthT } from '../types/authTypes';
import { DatabaseT } from '../types/databaseTypes';

type MainPageProps = {
    auth:AuthT;
    database:DatabaseT;
}
const MainPage = ({auth, database}:MainPageProps) => {
    return <Main auth={auth} database={database} />
}

export default MainPage;