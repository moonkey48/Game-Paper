import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import { AuthT } from '../types/authTypes';
import { DatabaseT } from '../types/databaseTypes';

type MainPageProps = {
    auth:AuthT;
    database:DatabaseT;
}
const MainPage = ({auth, database}:MainPageProps) => {
    return (
        <>
        <Header auth={auth}/>
        <Main auth={auth} database={database} />
        <Footer/>
        </>
    )
}

export default MainPage;