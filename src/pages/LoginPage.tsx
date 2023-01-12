import LoginContainer from '../components/login/LoginContainer';
import { AuthT } from '../types/authTypes';
import { DatabaseT } from '../types/databaseTypes';

type LoginPageProps = {
    database:DatabaseT;
    auth:AuthT
}
const LoginPage = ({database,auth}:LoginPageProps) => {
    return <LoginContainer database={database} auth={auth}/>
}

export default LoginPage;