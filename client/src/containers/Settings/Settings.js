import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import './Settings.css'

class Settings extends Component {
    render() {
        return (
            <div className="settings-container">
            <h1>Settings</h1>
            <Button clicked={this.props.onLogout}>Logout</Button>
            </div>
       
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logOut())
    }
}


export default connect(null,mapDispatchToProps)(Settings);