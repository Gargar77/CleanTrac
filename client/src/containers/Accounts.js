import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';


class Accounts extends Component {
    render() {
    console.log('API info in Accounts:',this.props.state)
    return <h1>Accounts</h1>
    }
}
const mapStateToProps = state => {
    return {
        accounts: state.auth
    }
}



export default connect(mapStateToProps)(Accounts);

