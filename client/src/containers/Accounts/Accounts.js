import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';


class Accounts extends Component {
    render() {
        return (
        <h1>{`welcome ${this.props.user.firstName}`}</h1>
        )}
}
const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        user: state.user
    }
}



export default connect(mapStateToProps)(Accounts);

