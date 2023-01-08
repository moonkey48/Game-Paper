import { UserCountListT } from '../../types/userTypes';
import s from './Counter.module.css';
import CounterUserItem from './CounterUserItem';

type CounterProps = {
    users:UserCountListT;
    handlePlus: (id:string) => void
    handleMinus: (id:string) => void
    handleChangeName: (memberId: string, changedName: string) => void;
    handleDeleteUser: (memberId: string) => void;
}
const Counter = ({users, handlePlus, handleMinus, handleChangeName, handleDeleteUser}:CounterProps) => {
    return (
        <ul className={s.counterList}>
        {
            Object.keys(users).map(key=>{
                return <CounterUserItem 
                key={key} 
                uid={key} 
                user={users[key]} 
                handlePlus={handlePlus}
                handleMinus={handleMinus}
                handleDeleteUser={handleDeleteUser}
                handleChangeName={handleChangeName}
                />
            }) 
        }
        </ul>
    )
}

export default Counter;