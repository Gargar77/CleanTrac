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

    

    render() {
        const comment = this.props.comment;
        return(
            <div className="comment-container">
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