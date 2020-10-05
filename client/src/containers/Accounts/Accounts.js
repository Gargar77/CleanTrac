import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';


class Accounts extends Component {
    render() {
        return (
        <div className="accounts-container">
            <div>HEADER</div>
            <div>BODY</div>
            <div>Footer</div>
        </div>
        )}
}
const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        user: state.user
    }
}



export default connect(mapStateToProps)(Accounts);

