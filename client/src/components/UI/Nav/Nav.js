import React from 'react';
import './Nav.css';

const nav = props => {
    let shadow = 'none';
    if (props.footer) {
        shadow = '0px 3px 11px -3px black';
    }
    return (
    <div className="nav" style={{backgroundColor:`${props.bcolor}`,boxShadow:shadow}}>{props.children}</div>
    );
}

export default nav;