import React from 'react';
import './Nav.css';

const nav = props => {
    return (
    <div className="nav">{props.children}</div>
    );
}

export default nav;