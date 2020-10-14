import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css';

import Nav from '../../components/UI/Nav/Nav';
import Profile from '../../components/Profile/Profile';
import PostButton from '../../components/PostButton/PostButton';
import NavItem from '../../components/Navigation/NavigationItem/NavigationItem';
import {ReactComponent as MessageSVG} from '../../assets/message.svg';
import {ReactComponent as CameraSVG} from '../../assets/camera.svg';
import {ReactComponent as GearSVG} from '../../assets/gear.svg';
import {ReactComponent as HomeSVG} from '../../assets/home.svg';
import AccountsViewer from '../AccountsViewer/AccountsViewer';
import Modal from '../../components/UI/Modal/Modal';
import NewPostForm from '../../components/Forms/NewPost';

class Home extends Component {

    state ={
        modalOn:false,
        newPost:false,
        settings:false,
        newPosts:[]
    }

    toggleModalHandler = () => {
        this.setState({
            ...this.state,
            modalOn: !this.state.modalOn,
            newPost:true,
            settings:false
        })
    }

    createPost = (accountId,title,content) => {
        const authToken = this.props.token;
        const data = {
            post: {
                account_id:accountId,
                title:title,
                content:content
            }
        }

        fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type':'application/json',
                    'Authorization' : 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            })
            .then(res=> res.json())
            .then(postId => {
                this.renderNewPost(postId,title,content)
            })
    }

    renderNewPost = (postId,title,content) => {
        const newPosts = [...this.state.newPosts];
        let post = {
            id:postId,
            title:title,
            content:content,
            author_fname:this.props.user.firstName,
            author_lname:this.props.user.lastName,
            created:0,
            comment_num:0,
            likes:0,
            userLiked:false,
            comments:[]
        }

        newPosts.unshift(post);

        this.setState({
            ...this.state,
            newPosts: newPosts
        })

        this.toggleModalHandler()
    }

    render() {
        let form = null
        if (this.state.newPost) {
            form = <NewPostForm createPost={this.createPost} accountSummary={this.props.accounts.accountSummary}/>
        }
        return (
            <div className="home-container">
                <Nav bcolor='whitesmoke'>
                    <Profile header/>
                    <div className="nav-items">
                    <NavItem klass="message" link="/messages"><MessageSVG/></NavItem>
                    <NavItem klass="camera" link="/camera"><CameraSVG/></NavItem>
                    </div>     
                </Nav>
            <div className="accounts-container">
                <AccountsViewer extra={this.state.newPosts}/>
                <Modal active={this.state.modalOn} toggle={this.toggleModalHandler}>
                    {form}
                </Modal>
            </div>
                <Nav footer>
                    <NavItem klass="home" link="/home"><HomeSVG/></NavItem>
                    <PostButton toggle={this.toggleModalHandler}/>
                    <NavItem klass="gear" link="/settings"><GearSVG/></NavItem>
                </Nav>
            </div>
        )}
}
const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        user: state.user,
        token: state.auth.token
    }
}



export default connect(mapStateToProps)(Home);

