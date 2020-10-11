import React, {Component} from 'react';
import './Account.css';
import {connect} from 'react-redux';
import Post from '../Post/Post';



class Account extends Component {
getPosts = () => {
    const posts = this.props.accountData.posts

    return posts.map((post,index)=> <Post key={"post" + index} data={post}/>);
    
}

    render() {

        let posts = this.getPosts();
        return(
            <div>
                <h1>{this.props.accountData.account_name}</h1>
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
