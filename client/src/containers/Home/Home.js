import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css';

import Nav from '../../components/UI/Nav/Nav';
import Profile from '../../components/Profile/Profile';
import PostButton from '../../components/PostButton/PostButton';
import NavItem from '../../components/Navigation/NavigationItem/NavigationItem';
// import {ReactComponent as MessageSVG} from '../../assets/message.svg';
// import {ReactComponent as CameraSVG} from '../../assets/camera.svg';
import {ReactComponent as GearSVG} from '../../assets/gear.svg';
import {ReactComponent as HomeSVG} from '../../assets/home.svg';
import AccountsViewer from '../AccountsViewer/AccountsViewer';
import Modal from '../../components/UI/Modal/Modal';
import NewPostForm from '../../components/Forms/NewPost';
import NewPostsAccount from '../../components/Account/Account';
import Settings from '../Settings/Settings';
import UserProfile from '../UserProfile/UserProfile';

class Home extends Component {

    constructor(props) {
        super(props)
        this.accountsRef = React.createRef();
    }

    state ={
        modalOn:false,
        newPost:false,
        verify:false,
        userInfo:false,
        settings:false,
        recentPosts:[]
    }
    


    toggleModalHandler = (type) => {
        switch(type) {

            case "verify":
                this.setState({
                    ...this.state,
                    modalOn:true,
                    newPost:false,
                    verify:true,
                    userInfo:false,
                    settings:false
                })
                break;
            case "post":
                this.setState({
                    ...this.state,
                    modalOn: !this.state.modalOn,
                    newPost:true,
                    verify:false,
                    userInfo:false,
                    settings:false
                })
                break;
            case "setting":
                this.setState({
                    ...this.state,
                    modalOn: !this.state.modalOn,
                    newPost:false,
                    verify:false,
                    userInfo:false,
                    settings:true
                })
                break;
            case "user":
                this.setState({
                    ...this.state,
                    modalOn: !this.state.modalOn,
                    newPost:false,
                    verify:false,
                    userInfo:true,
                    settings:false
                })
            default:
                this.setState({
                    ...this.state,
                    modalOn: !this.state.modalOn,
                    newPost:false,
                    verify:false,
                    userInfo:true
                })
        }   
       
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
        const newPosts = [...this.state.recentPosts];
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
            recentPosts:newPosts
        })

        this.toggleModalHandler()
        this.accountsRef.current.scroll(0,0);
        
    }

    removeRenderedPost = (id) => {
        let posts = [...this.state.recentPosts];

        posts = posts.filter((post) => {
            return post.id !== id
        })

        this.setState({
            ...this.state,
            recentPosts:posts
        })
    }



    


    render() {
        let form = null
        if (this.state.newPost) {
            form = <NewPostForm createPost={this.createPost} accountSummary={this.props.accounts.accountSummary}/>
        } else if(this.state.verify) {
            form = null
        } else if(this.state.userInfo){
            form = <UserProfile/>
        }   else {
            form = <Settings/>
        }

        let posts = [...this.state.recentPosts];

        
        return (
            <div className="home-container">
                <Nav bcolor='whitesmoke'>
                    <Profile header id={this.props.user.userId} clicked={()=> this.toggleModalHandler("user")}/>
                    <div className="nav-items">
                    <p className="welcome-message">{`welcome,\n${this.props.user.firstName}`}</p>
                    {/* <NavItem klass="message" link="/messages"><MessageSVG/></NavItem> */}
                    {/* <NavItem klass="camera" link="/camera"><CameraSVG/></NavItem> */}
                    </div>     
                </Nav>
            <div className="accounts-container" ref={this.accountsRef}>
                <NewPostsAccount userPosts accountData={posts} removeRenderedPost={this.removeRenderedPost}/>
                <AccountsViewer removeRenderedPost={this.removeRenderedPost} toggle={this.toggleModalHandler}></AccountsViewer>
                <Modal active={this.state.modalOn} toggle={this.toggleModalHandler}>
                    {form}
                </Modal>
            </div>
                <Nav footer>
                    <NavItem klass="home" link="/home"><HomeSVG/></NavItem>
                    <PostButton toggle={()=> this.toggleModalHandler("post")}/>
                    {/* <NavItem klass="gear" link="/settings"><GearSVG/></NavItem> */}
                    <li onClick={()=> this.toggleModalHandler('setting')} className="nav-link gear" ><GearSVG/></li>
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

