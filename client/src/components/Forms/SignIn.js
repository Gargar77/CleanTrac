import React from 'react';

const signInForm = (props) => {
    return (
        <form onSubmit={props.submit} className="form signin">
             <label htmlFor="username-input">Email</label>
            <input
                className="form__input"
                id="username-input"
                type="email"
                name="auth[email]"
            />
            <label htmlFor="password-input">Password</label>
            <input
                className="form__input"
                type="password"
                name="auth[password]"
                id="password-input"
            />
            <button type="submit" className="button">Login</button>
        </form>
    );
}

export default signInForm;