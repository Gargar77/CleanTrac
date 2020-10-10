import React from 'react';
import './PostButton.css';
import {ReactComponent as Cross} from '../../assets/cross.svg';
import NavItem from '../Navigation/NavigationItem/NavigationItem';

const postButton = props => {
    return (
        <div className='post-button'>
            <Cross/>
            <NavItem klass="button" link="/post"/>
        </div>
    );
}

export default postButton;