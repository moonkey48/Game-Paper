import { UserList } from './CountContainer';
import s from './Counter.module.css';

type CounterProps = {
    users:UserList;
    handleAdd: (id:string) => void
}
const Counter = ({users, handleAdd}:CounterProps) => {
    return (
        <ul className={s.counterList}>
        {
            Object.keys(users).map(key=>{
                return <li key={key} className={s.counterItem}>
                    <h3 className={s.userName}>{users[key].name}</h3>
                <div 
                onClick={()=>handleAdd(key)}
                className={s.countBox}>
                    <h1>{users[key].count}</h1>
                </div>
            </li>
            }) 
        }
        </ul>
    )
}

export default Counter;