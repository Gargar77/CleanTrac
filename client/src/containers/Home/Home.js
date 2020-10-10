import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import './Home.css';

import Nav from '../../components/UI/Nav/Nav';
import Profile from '../../components/Profile/Profile';
import PostButton from '../../components/PostButton/PostButton';
import NavItem from '../../components/Navigation/NavigationItem/NavigationItem';
import {ReactComponent as MessageSVG} from '../../assets/message.svg';
import {ReactComponent as CameraSVG} from '../../assets/camera.svg';
import {ReactComponent as GearSVG} from '../../assets/gear.svg';
import {ReactComponent as HomeSVG} from '../../assets/home.svg';
import PostsViewer from '../PostsViewer/PostsViewer';


class Home extends Component {
    render() {
        return (
        <div className="home-container">
            <Nav bcolor='whitesmoke'>
                <Profile header/>
                <div className="nav-items">
                <NavItem klass="message" link="/messages"><MessageSVG/></NavItem>
                <NavItem klass="camera" link="/camera"><CameraSVG/></NavItem>
                </div>
                
            </Nav>
        <div>
            <PostsViewer/>
        </div>
            <Nav footer>
                <NavItem klass="home" link="/home"><HomeSVG/></NavItem>
                <PostButton/>
                <NavItem klass="gear" link="/settings"><GearSVG/></NavItem>
            </Nav>
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

