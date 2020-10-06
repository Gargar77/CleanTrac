import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={"nav-link " + (props.klass || "")}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            >{props.children}</NavLink>
    </li>
);

export default navigationItem;