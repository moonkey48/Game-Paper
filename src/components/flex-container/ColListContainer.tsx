import React, { ReactNode } from 'react';
import s from './flexContainer.module.css';


type ColContainerProps = {
    children: ReactNode
}
const ColListContainer = ({children}:ColContainerProps) => {
    return <ul className={s.colList}>
        {children}
    </ul>
}

export default ColListContainer;