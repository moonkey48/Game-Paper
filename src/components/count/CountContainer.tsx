import React, { useState } from 'react';
import Counter from './Counter';

export type User = {
    name:string,
    id:string,
    count:number
}
export type UserList = {
    [key:string]: User
}
const usersDefault: UserList = {
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
    const [users,setUsers] = useState<UserList>(usersDefault)
    const onPlus = (id: string) =>{
        const updated = {...users};
        updated[id].count = updated[id].count + 1;
        setUsers(updated)
    }
    return (
        <>
            <Counter 
            users={users} 
            handleAdd={onPlus}
            />
        </>
    )
}

export default CountContainer;