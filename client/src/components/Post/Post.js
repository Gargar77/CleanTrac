import React, { Component } from 'react';
import './Post.css';

import Profile from '../Profile/Profile';
import LikeStatus from '../UI/LikeStatus/LikeStatus';
import PostActions from '../PostActions/PostActions';
import CommentsView from '../CommentsView/CommentsView';
class Post extends Component {

    state = {
        postId:null,
        userId:null,
        liked:false,
        commentsToggled:false,
        upload: null
    }

    componentDidMount() {

        if (!this.state.upload) {
            const upload = this.randomUpload();
            this.setState({
                ...this.state,
                upload:upload
            })
        }
    }

    randomUpload = () => {
        let randIdx = Math.round(Math.random(10));
        if (randIdx % 2 === 0) {
            return `https://loremflickr.com/400/200?${randIdx + Math.random(100)}`
        } else {
            return ""
        }
    }

    getDaysAgo = () => {
       let day =  Math.round(parseInt(this.props.data.created))
       if (day <= 0) {
           return 'now'
       } else if(day === 1) {
           return 'yesterday'
       } else {
        return `${day} days`
       }
    }

    getCommentNum = () => {
        let num = this.props.data.comment_num;
        if (num > 1) {
            return `${num} comments`
        } else if(num === 0) {
            return "no comments"
        } else {
            return `${num} comment`
        }
    }

    commentToggleHandler = () => {
        this.setState({
            ...this.state,
            commentsToggled: !this.state.commentsToggled
        })
    }

    likeToggleHandler = () => {
        this.setState({
            ...this.state,
            liked: !this.state.liked
        })
    }


    render() {
        const post = this.props.data;
        return (
            <div className="post-container">
                <div className="post-user">
                    <Profile id={this.props.id}/>
                    <h1>{post.author_fname + " " + post.author_lname}</h1>
                    <h3>{this.getDaysAgo()}</h3>
                </div>
                <div className="post-content">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <div className="post-upload-container">
                        <img
                            src={this.state.upload}
                            alt=""
                        />
                    </div>
                </div>
                <div className="post-status">
                    <LikeStatus liked={this.state.liked} likes={post.likes}/>
                <p 
                    className="comment-toggle" 
                    onClick={()=> this.commentToggleHandler()}
                    style={this.state.commentsToggled ? {textDecoration:'underline'} : null}
                    >{this.getCommentNum()}</p>
                </div>
                <hr style={{width:'90%'}} />
                <PostActions liked={this.state.liked} postData={{...post}} likeClicked={this.likeToggleHandler}/>
                <CommentsView active={this.state.commentsToggled} post={post.author_fname} comments={[...post.comments]}/>
            </div>
        );
    }
}

export default Post;
