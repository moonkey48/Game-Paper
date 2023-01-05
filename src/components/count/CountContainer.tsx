import React, { useState } from 'react';
import { UserListT } from '../../types/user';
import Counter from './Counter';

const usersDefault: UserListT = {
    "austin_1": {   
        name: "austin",
        id:"austin_1",
        count: 0
    },
    "lizzy_2": {   
        name: "lizzy",
        id:"lizzy_2",
        count: 0
    }
}

const CountContainer = () => {
    const [users,setUsers] = useState<UserListT>(usersDefault)
    const onPlus = (id: string) =>{
        const updated = {...users};
        updated[id].count = updated[id].count + 1;
        setUsers(updated)
    }
    const onMinus = (id:string) => {
        const updated = {...users};
        updated[id].count = updated[id].count - 1;
        setUsers(updated)
    }
    return (
        <>
            <Counter 
            users={users} 
            handlePlus={onPlus}
            handleMinus={onMinus}
            />
        </>
    )
}

export default CountContainer;