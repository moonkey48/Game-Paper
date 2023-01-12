import React from 'react';
import s from './title.module.css'

type Align = 'left' | 'right' | 'center'
type TitleProps = {
    message: string;
    align?: Align
}
const LargeTitle = ({message, align = 'left'}:TitleProps) => {
    return <h2 className={`${s.large} ${s[align]}`}>{message}</h2>
}

export default LargeTitle;