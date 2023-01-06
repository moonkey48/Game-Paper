import { UserListT } from '../../types/user';
import s from './Counter.module.css';

type CounterProps = {
    users:UserListT;
    handlePlus: (id:string) => void
    handleMinus: (id:string) => void
}
const Counter = ({users, handlePlus, handleMinus}:CounterProps) => {
    return (
        <ul className={s.counterList}>
        {
            Object.keys(users).map(key=>{
                return <li key={key} className={s.counterItem}>
                    <h3 className={s.userName}>{users[key].name}</h3>
                <div 
                className={s.countBox}>
                    <h1>{users[key].count}</h1>
                </div>
                <div className={s.buttonBox}>
                    <button onClick={()=>handlePlus(key)}>+</button>
                    <button onClick={()=>handleMinus(key)}>-</button>
                </div>
            </li>
            }) 
        }
        </ul>
    )
}

export default Counter;