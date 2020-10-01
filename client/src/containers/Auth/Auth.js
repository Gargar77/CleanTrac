// basic structure of a form in order to request from rails API
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Auth.css';

import SignInForm from '../../components/Forms/SignIn';
import SignUpForm from '../../components/Forms/SignUp';
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {

    state = {
        isSignup:false,
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
    
    render() {
        

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }
       
        let form = <SignInForm submit={this.formSubmitHandler}/>

        if (this.props.loading) {
            form = <Spinner/>
        } else if (this.state.isSignup) {
            form = <SignUpForm submit={this.formSubmitHandler}/>
        }
        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p className="auth-error" style={{color:'red'}}>{this.props.error}</p>
            );
        }

        let auth = (
            <div>
                {authRedirect}
                {form}
                {errorMessage}
            </div>
        )

        if (this.state.isLanding) {
            auth = (
                <div>
                    <button>Sign up</button>
                    <p>Already have an account? <span>Sign in</span></p>
                </div>

            )
        }

        return (
            <div>
                {auth}
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