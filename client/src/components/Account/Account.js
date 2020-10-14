import React, {Component} from 'react';
import './Account.css';
import {connect} from 'react-redux';
import Post from '../Post/Post';



class Account extends Component {
getPosts = () => {
    const posts = this.props.accountData.posts

    return posts.map((post,index)=> <Post key={"post" + index} id={"post" + index} data={post}/>);
    
}

    render() {
        let title;
        if (this.props.userPosts) {
            title = <h1>New</h1>
        } else {
            title = <h1>all from {this.props.accountData.account_name}</h1>
        }
        let posts = this.getPosts();
        if (posts.length === 0) {
            title = null;
        }

        return(
            <div className="account-container">
                {title}
                {posts}
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        accounts:state.accounts.entities
    }
}


export default connect(mapStateToProps)(Account);
