// basic structure of a form in order to request from rails API
import React, { Component } from 'react';
// import axios from 'axios';

class AuthForm extends Component {
    state= {
        authTokenReceived: false
    }

    getAuthToken = () => {
        // get token from rails app using axios
        // axios.post('http://localhost:3001/auth/signin'
    }

    getuserData = (authToken) => {
        // get user data upon receiving a jwt token
    }

    formSubmitHandler = (event) => {
        // handle the submit action in the form
       
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