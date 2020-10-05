import React from 'react';

import Spinner from '../Spinner/Spinner';
import './LoadScreen.css';

const loadScreen = () => {
    return (
        <div className="load-screen">
            <Spinner/>
        </div>
    );
}


export default loadScreen;