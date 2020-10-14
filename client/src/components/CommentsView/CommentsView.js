import React, { Component } from 'react';
import './CommentsView.css';
import Comment from './Comment/Comment';
import NewComment from './NewComment/NewComment';

class commentsView extends Component {
    
    
    shouldRenderComments = () => {
        if (this.props.active || this.props.newComment) {
            return this.getComments()
        } else {
            return null
        }
    }
    getComments = () => {
        let comments = this.props.comments
        let commentList = comments.map((comment,idx)=> {
            return <Comment  removeComment={this.props.removeComment} data={comment} id={"comment" + this.props.post.author_fname + idx} key={"comment" + this.props.post.author_fname + idx}/>
        })
        let extraComments = this.props.extra.map((comment,idx)=> {
            return <Comment userPost removeComment={this.props.removeComment} data={comment} id={comment.id} key={comment.id}/>
        })
        commentList.unshift(extraComments);

        if (this.props.newComment) {
             commentList.unshift(<NewComment postId={this.props.post.id} key={Math.random(100)}createComment={this.props.addComment}/>)
             window.location.hash = "new-comment"
        } 

        return commentList;
    }

    render() {

        return(
            <div className="comments-container">
                {this.shouldRenderComments()}

            </div>
         );
     }
    }

    


export default commentsView;