import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';


class Accounts extends Component {
    render() {
    return <h1>Account Name: {this.props.accounts[12].accountName}</h1>
    }
}
const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
}

export default connect(mapStateToProps)(Accounts);

