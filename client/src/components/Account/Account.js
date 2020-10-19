import React, {Component} from 'react';
import './Account.css';
import {connect} from 'react-redux';
import Post from '../Post/Post';



class Account extends Component {
    state = {
        posts:[]
    }

    componentDidMount() {   
        let posts;
        if (this.props.userPosts) {
            posts = this.props.accountData
        } else {
            posts = this.props.accountData.posts
        }
        
        this.setState({
            posts:posts
        })
    }
    
    getPosts = () => {
        const posts = this.state.posts;
        if (this.props.userPosts) {
            return this.props.accountData.map((post,index)=> <Post userPost modal={this.props.toggleM} removePost={this.removePost} tempRemove={this.props.removeRenderedPost} key={"post" + index} id={"post" + index} data={post}/>);
        } else {
            return posts.map((post,index)=> <Post modal={this.props.toggleM} removePost={this.removePost} tempRemove={this.props.removeRenderedPost} key={"post" + index} id={"post" + index} data={post}/>);
        }

        
    }

    removePost = (id) => {

        let posts = [...this.state.posts];

        posts = posts.filter((post) => {
            return post.id !== id
        })

        this.setState({posts:posts})
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
