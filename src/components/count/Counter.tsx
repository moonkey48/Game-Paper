import { UserCountListT } from '../../types/userTypes';
import s from './Counter.module.css';

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
                return <li key={key} className={s.counterItem}>
                    <h3 className={s.userName}>{users[key].name}</h3>
                <div 
                className={s.countBox}>
                    <h1>{users[key].payload}</h1>
                </div>
                <div className={s.buttonBox}>
                    <button onClick={()=>handlePlus(key)}>+</button>
                    <button onClick={()=>handleMinus(key)}>-</button>
                </div>
                <button onClick={()=>handleDeleteUser(key)}>delete User</button>
            </li>
            }) 
        }
        </ul>
    )
}

export default Counter;