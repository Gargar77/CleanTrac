// basic structure of a form in order to request from rails API
import React, { Component } from 'react';
// import {auth} from  '../axios-orders';

class AuthForm extends Component {
    state= {
        authTokenReceived: false
    }

    getAuthToken = (event) => {

        const formData = new FormData();
        formData.append("auth[email",event.target[0].value);
        formData.append("auth[password]",event.target[1].value)
        
        fetch('http://localhost:3001/auth/signin', {
            method:'POST',
            body: formData,
            redirect: 'manual'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error",error))
    }

    getuserData = (authToken) => {
        // get user data upon receiving a jwt token
        console.log(authToken)
    }

    formSubmitHandler = (event) => {
        // handle the submit action in the form
        event.preventDefault();
        this.getAuthToken(event)
        
    }
    
    render() {
        return (
        <form onSubmit={this.formSubmitHandler} className="form auth"method="POST">
             <label htmlFor="username-input">Username</label>
            <input
                className="form__input"
                id="username-input"
                type="email"
                name="auth[username]"
            />
            <label htmlFor="password-input">Password</label>
            <input
                className="form__input"
                type="password"
                name="auth[password]"
                id="password-input"
            />
            <button type="submit" className="button">{this.props.action}</button>
        </form>
        )
    }
}

export default AuthForm;