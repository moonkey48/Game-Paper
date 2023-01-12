import React from 'react';
import s from './Footer.module.css'

const Footer = () => {
    return <footer className={s.footer}>
        design & develop by &nbsp; <a className={s.link} href="https://github.com/moonkey48">moonkey48</a>
    </footer>
}

export default Footer;