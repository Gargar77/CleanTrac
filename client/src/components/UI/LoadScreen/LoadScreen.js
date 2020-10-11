import React from 'react';

import Spinner from '../Spinner/Spinner';
import './LoadScreen.css';

const loadScreen = props => {
    return (
        <div className="load-screen">
            <Spinner/>
    <p className="loading-text">{props.children}</p>
        </div>
    );
}


export default loadScreen;