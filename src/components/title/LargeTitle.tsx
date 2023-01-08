import React from 'react';
import s from './title.module.css'

type Align = 'left' | 'right' | 'center'
type LargeTitleProps = {
    message: string;
    align?: Align
}
const LargeTitle = ({message, align = 'left'}:LargeTitleProps) => {
    return <h2 className={`${s.large} ${s[align]}`}>{message}</h2>
}

export default LargeTitle;