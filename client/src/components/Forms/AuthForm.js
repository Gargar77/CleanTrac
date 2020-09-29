import React from 'react';

const authForm = (props) => {
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
    );
}

export default authForm;