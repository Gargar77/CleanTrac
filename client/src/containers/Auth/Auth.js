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
import {ReactComponent as SpongeSVG} from '../../assets/sponge.svg';

class Auth extends Component {
    state = {
        isSignIn:false,
        isLanding:true
    }

    formSubmitHandler = (event) => {
        // handle the submit action in the form
        event.preventDefault();
        let formEl = event.currentTarget.childNodes;
        // const headers = new Headers();
        // headers.set('Accept','application/json');

        let formData = new FormData();
        for (let i = 0; i < formEl.length - 1; i++) {
            let node = formEl[i].childNodes[0];
            if (node.name === 'uniqueId') {
                let uniqueIds = this.parseUniqueId(node.value);
                formData.append('user[company_id]',uniqueIds[0]);
                formData.append('user[leader_id]',uniqueIds[1]);
                continue;
            }
            formData.append(node.name, node.value);
        }


        if (this.state.isSignIn) {
            this.props.onAuth(formData);
        } else {
            this.props.onSignUp(formData);
        }
    }

    parseUniqueId(idString) {
        let ids = idString.split('_');
        return ids;
    }

    startSignInHandler = () => {
        this.setState({
            isSignIn:true,
            isLanding:false
        })
        this.props.onClearErrors();

    }

    startSignUpHandler = () => {
        this.setState({isLanding:false})
        this.props.onClearErrors();
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
                {/* <CleaningSVG/> */}
                <SpongeSVG/>
                <Button clicked={this.startSignUpHandler}>Sign up</Button>
                <p>Already have an account? <span onClick={this.startSignInHandler} className="landing__signin">Sign in</span></p>
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
           nav = <li className="auth__nav" onClick={this.goBackHandler}></li>
        
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
        onAuth: (formData) => dispatch(actions.auth(formData)),
        onSignUp: (formData) => dispatch(actions.signUp(formData)),
        onClearErrors: () => dispatch(actions.clearErrors())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);