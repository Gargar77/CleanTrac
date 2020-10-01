// basic structure of a form in order to request from rails API
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Auth.css';

import SignInForm from '../../components/Forms/SignIn';
import SignUpForm from '../../components/Forms/SignUp';
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
class Auth extends Component {

    state = {
        isSignIn:false,
        isLanding:true
    }

    formSubmitHandler = (event) => {
        // handle the submit action in the form
        event.preventDefault();
        const formData = new FormData();
        formData.append("auth[email]",event.target[0].value);
        formData.append("auth[password]",event.target[1].value)
        
        this.props.onAuth(formData);
    }

    startSignInHandler = () => {
        this.setState({
            isSignIn:true,
            isLanding:false
        })
    }

    startSignUpHandler = () => {
        this.setState({isLanding:false})
    }

    goBackHandler = () => {
        this.setState({
            isSignIn:false,
            isLanding:true
        })
    }
    
    render() {
        

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }
        let auth = (
            <div className="landing">
                <h1>Let's Get Started</h1>
                <Button clicked={this.startSignUpHandler}>Sign up</Button>
                <p>Already have an account? <span onClick={this.startSignInHandler}>Sign in</span></p>
            </div>
        )
        if (this.props.loading) {
            auth = <Spinner/>
        } else if (this.state.isSignIn && !this.state.isLanding) {
            auth = <SignInForm submit={this.formSubmitHandler}/>
        } else if (!this.state.isLanding) {
            auth = <SignUpForm submit={this.formSubmitHandler}/>
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p className="auth-error" style={{color:'red'}}>{this.props.error}</p>
            );
        }



        
        let nav = null;
        if (!this.state.isLanding) 
           nav = <li onClick={this.goBackHandler}>Back</li>
        
        return (
            <div className="auth">
                {nav}
                {authRedirect}
                {auth}
                {errorMessage}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error:state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirectPath,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (formData) => dispatch(actions.auth(formData))

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);