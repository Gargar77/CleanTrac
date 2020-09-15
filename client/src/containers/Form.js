// basic structure of a form in order to request from rails API
import React, { Component } from 'react';

class Form extends Component {
    state= {
        authTokenReceived: false
    }

    getAuthToken = () => {
        // get token from rails app using axios
    }
    
    render() {
        <form action={props.action} method="POST">
             <input
                type="hidden"
                name="authenticity_token"
                value={getAuthToken()}
    />
        </form>
    }


}