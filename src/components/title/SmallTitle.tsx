import React from 'react';
import s from './title.module.css'

type Align = 'left' | 'right' | 'center'
type TitleProps = {
    message: string;
    align?: Align
}
const SmallTitle = ({message, align = 'left'}:TitleProps) => {
    return <h5 className={`${s.small} ${s[align]}`}>{message}</h5>
}

export default SmallTitle;