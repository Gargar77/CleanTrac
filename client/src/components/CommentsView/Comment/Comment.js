import React, {Component} from 'react';
import './Comment.css';
import Profile from '../../Profile/Profile';
import LikeStatus from '../../UI/LikeStatus/LikeStatus';
import {connect} from 'react-redux';


class Comment extends Component {
    state = {
        liked:false,
        commentsToggled:false,
        upload: null,
        likeRequestPending:false
        }

    componentDidMount() {
        if (this.props.data.userLiked !== this.state.liked) {
            const liked = this.props.data.userLiked
            this.setState({
                ...this.state,
                    liked: liked
            })
        }
    }

    commentLikeHandler = () => {
        if (this.state.likeRequestPending) {
            this.setState({
                ...this.state,
                liked: !this.state.liked
            })
        } else {
            this.setState({
                ...this.state,
                liked: !this.state.liked,
                likeRequestPending:true,
                likeButtonTouched:true
            })

            setTimeout(() => {
                const liked = this.state.liked;
                const token = this.props.token;
                const commentId = this.props.data.id;
                if (liked) {
                    this.newLike(token,commentId,'Comment')
                } else {
                    this.deleteLike(token,commentId,'Comment')
                }
            }, 1000);
        }
        
    }

    newLike = (authToken,likeableId,type) => {
            const data = {
                like: {
                
                    likeable_id:likeableId,
                    likeable_type:type
                }
            }
            fetch('/api/likes/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type':'application/json',
                    'Authorization' : 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    this.setState({
                        ...this.state,
                        likeRequestPending:false
                    })
                    console.log(res)
                })
                .catch(err => console.log(err))
        }


        deleteLike = (authToken,likeableId,type) => {
            const data = {
                like: {
                    likeable_id:likeableId,
                    likeable_type:type
                }
            }
            fetch('/api/likes/', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'content-type':'application/json',
                    'Authorization' : 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    this.setState({
                        ...this.state,
                        likeRequestPending:false
                    })
                    console.log(res)
                })
                .catch(err => console.log(err))
        }

        commentDeleteHandler = () => {
            const authToken = this.props.token;

            fetch('/api/comments/', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'content-type':'application/json',
                    'Authorization' : 'Bearer ' + authToken
                },
                body: JSON.stringify({id: this.props.data.id})
            })
            .then(res => res.json())
            .then(id => this.props.removeComment(id));
        }

    render() {
        let likebutton = null;

        if(!this.state.liked) {
            likebutton = <span onClick={this.commentLikeHandler} className="comment__like-toggle">like</span>
        } else {
            likebutton = <span onClick={this.commentLikeHandler} className="comment__like-toggle">unlike</span>

        }
        const comment = this.props.data;
        let deleteButton;
        if ((this.props.data.authorId === this.props.userId) || this.props.userPost) {
            deleteButton = <span onClick={this.commentDeleteHandler} className="delete" >delete</span>
        }
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
                    {deleteButton}
                </div>
            </div>
        
        );
    }
}


const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        token: state.auth.token,

    }
}

export default connect(mapStateToProps)(Comment);