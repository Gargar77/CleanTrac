import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import './Home.css';

import Nav from '../../components/UI/Nav/Nav';

class Home extends Component {
    render() {
        return (
        <div className="home-container">
            <Nav>NAVBAR - HEADER</Nav>
            <div style={{backgroundColor:"blue"}}></div>
            <Nav>NAVBAR - FOOTER</Nav>
        </div>
        )}
}
const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        user: state.user
    }
}



export default connect(mapStateToProps)(Home);

