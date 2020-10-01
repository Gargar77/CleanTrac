// basic structure of a form in order to request from rails API
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';


import AuthForm from '../../components/Forms/AuthForm';
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {

    formSubmitHandler = (event) => {
        // handle the submit action in the form
        event.preventDefault();
        const formData = new FormData();
        formData.append("auth[email",event.target[0].value);
        formData.append("auth[password]",event.target[1].value)
        
        this.props.onAuth(formData);
    }
    
    render() {
        

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }
       
        let form = <AuthForm submit={this.formSubmitHandler} action="LOGIN"/>
        if (this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p style={{color:'red'}}>{this.props.error}</p>
            );
        }

        return (
            <div>
                {authRedirect}
                {form}
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