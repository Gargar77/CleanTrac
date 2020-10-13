import React, { Component } from 'react';
import './CommentsView.css';
import Comment from './Comment/Comment';


class commentsView extends Component {

    
    shouldRenderComments = () => {
        if (this.props.active) {
            return this.getComments()
        } else {
            return null
        }
    }
    getComments = () => {
        let comments = this.props.comments
        return comments.map((comment,idx)=> {
            return <Comment comment={comment} id={"comment" + this.props.post + idx} key={"comment" + this.props.post + idx}/>
        })  
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