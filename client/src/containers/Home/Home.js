import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import './Home.css';

import Nav from '../../components/UI/Nav/Nav';
import Profile from '../../components/Profile/Profile';
import NavItem from '../../components/Navigation/NavigationItem/NavigationItem';
import {ReactComponent as MessageSVG} from '../../assets/message.svg';
import {ReactComponent as CameraSVG} from '../../assets/camera.svg';
import {ReactComponent as GearSVG} from '../../assets/gear.svg';



class Home extends Component {
    render() {
        return (
        <div className="home-container">
            <Nav>
                <Profile header/>
                <div className="nav-items">
                <NavItem klass="message" link="/messages"><MessageSVG/></NavItem>
                <NavItem klass="camera" link="/camera"><CameraSVG/></NavItem>
                <NavItem klass="gear" link="/settings"><GearSVG/></NavItem>
                </div>
                
            </Nav>
            <div></div>
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

