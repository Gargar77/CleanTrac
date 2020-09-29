import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';


class Accounts extends Component {
    render() {
        console.log(this.props.accounts)
       return <h1>ACCOUNTS</h1>
    }
}
const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
}

export default connect(mapStateToProps)(Accounts);

