// basic structure of a form in order to request from rails API
import React, { Component } from 'react';
// import {auth} from  '../axios-orders';

class AuthForm extends Component {
    state= {
        authTokenReceived: false
    }


    getuserData = (authToken) => {
        // get user data upon receiving a jwt token
        fetch('http://localhost:3001/api/user',{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'content-type':'application/json',
                'Authorization' : 'Bearer ' + authToken.jwt
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
        })
        .catch(error => console.log("error",error))
    }

    formSubmitHandler = (event) => {
        // handle the submit action in the form
        event.preventDefault();
        const formData = new FormData();
        formData.append("auth[email",event.target[0].value);
        formData.append("auth[password]",event.target[1].value)
        
        fetch('http://localhost:3001/auth/signin', {
            method:'POST',
            body: formData,
            redirect: 'manual'
        })
            .then(response => response.json())
            .then((token)=> {
                this.getuserData(token)
            })
            .catch(error => console.log("[token_request_error]",error))
        
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