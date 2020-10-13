import React, {Component} from 'react';
import './Comment.css';
import Profile from '../../Profile/Profile';
import LikeStatus from '../../UI/LikeStatus/LikeStatus';

class Comment extends Component {
    state = {
        commentId:null,
        userId:null,
        liked:false
    }

    commentLikeHandler = () => {
        this.setState({
            ...this.state,
            liked: !this.state.liked
        })
    }

    render() {
        let likebutton = null;

        if(!this.state.liked) {
            likebutton = <span onClick={this.commentLikeHandler} className="comment__like-toggle">like</span>
        } else {
            likebutton = <span onClick={this.commentLikeHandler} className="comment__like-toggle">unlike</span>

        }
        const comment = this.props.comment;
        return(
            <div className="comment-container">
                {likebutton}
                <div className="comment__user">
                <Profile/>
                </div>
                <div className="comment__content">
                    <p className="comment__author">{comment.author_fname}</p>
                    <p className="comment__body">{comment.content}</p>
                    <LikeStatus liked={this.state.liked} likes={comment.likes}/>
                </div>
            </div>
        
        );
    }
}

export default Comment;