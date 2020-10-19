import React from 'react';
import Button from '../UI/Button/Button';
import './VerifySubmission.css';

const verify = props => {
    return(
        <div className="verification-container">
            <h1>Are you sure?</h1>
            <Button clicked={()=> props.verify(true)}>Yes</Button>
            <Button clicked={()=> props.verify(false)}>No</Button>
        </div>
       
    );
    
}

export default verify;