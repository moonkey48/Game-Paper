import React, { ReactNode } from 'react';
import s from './flexContainer.module.css'

type RowListContainerProps = {
    children:ReactNode
}
const RowListContainer = ({children}:RowListContainerProps) => {
    return <ul className={s.rowList}>
        {children}
    </ul>
}

export default RowListContainer;