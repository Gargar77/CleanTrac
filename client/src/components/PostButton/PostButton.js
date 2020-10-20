import React from 'react';
import './PostButton.css';
import {ReactComponent as Cross} from '../../assets/cross.svg';

const postButton = props => {
    return (
        <div  onClick={props.toggle} className='post-button'>
            <Cross/>
            {/* <NavItem klass="button" link="/post"/> */}
        </div>
    );
}

export default postButton;