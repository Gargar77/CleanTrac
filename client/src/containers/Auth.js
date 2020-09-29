// basic structure of a form in order to request from rails API
import React, { Component } from 'react';
import AuthForm from '../components/Forms/AuthForm';
import { Redirect } from 'react-router-dom';
class Auth extends Component {
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
            .then(()=> this.setState({authTokenReceived:true}))
            .catch(error => console.log("[token_request_error]",error))
        
    }
    
    render() {
        
        let content;
        if (this.state.authTokenReceived) {
            content = <Redirect to="/accounts"/>
        } else {
            content = <AuthForm submit={this.formSubmitHandler} action="LOGIN"/>
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default Auth;