import React, { Component } from 'react';
import './Post.css';
import {connect} from 'react-redux';

import Profile from '../Profile/Profile';
import LikeStatus from '../UI/LikeStatus/LikeStatus';
import PostActions from '../PostActions/PostActions';
import CommentsView from '../CommentsView/CommentsView';
import Modal from '../UI/Modal/Modal';
import Verify from '../VerifySubmission/VerifySubmission';


class Post extends Component {

    state = {
        liked:false,
        commentsToggled:false,
        upload: null,
        likeRequestPending:false,
        addingComment:false,
        recentComments:[],
        persistedComments:[],
        verify:false
    }

    

    componentDidMount() {
        if (!this.state.upload) {
            const upload = this.randomUpload();
            this.setState({
                ...this.state,
                upload:upload
            })
        }

        if (this.props.data.userLiked !== this.state.liked) {
            const liked = this.props.data.userLiked
            this.setState({
                ...this.state,
                    liked: liked
            })
        }
        let comments = [...this.props.data.comments];

        this.setState({
            persistedComments:comments
        })
    }

    removePostedComment = (id) => {
        let recentComments = [...this.state.recentComments];
        let persistedComments = [...this.state.persistedComments];
        recentComments = recentComments.filter((comment)=> {
            return comment.id !== id
        })

        persistedComments = persistedComments.filter((comment) => {
            return comment.id !== id
        })

        this.setState({
            ...this.state,
            recentComments: recentComments,
            persistedComments: persistedComments
        })
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
                const postId = this.props.data.id;
                if (liked) {
                    this.newLike(token,postId,'Post')
                } else {
                    this.deleteLike(token,postId,'Post')
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

        newCommentHandler = () =>  {
            this.setState({
                ...this.state,
                addingComment: !this.state.addingComment
            })
        }

        renderNewComment = (comment,id) => {
            let comments = [...this.state.recentComments]
            const newComment = {
                    id:id,
                    author_fname:this.props.user.firstName,
                    author_lname: this.props.user.lastName,
                    content: comment,
                    likes:0,
                    userLiked:false
            }

            comments.push(newComment);

            this.setState({
                ...this.state,
                recentComments: comments
            })
        }

        deletePostHandler = () => {
            this.setState({
                ...this.state,
                verify:true
            })
        }

        deletePost = () => {

            // let confirmation = this.props.modal("verify")
            const authToken = this.props.token;

            fetch('/api/posts/', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'content-type':'application/json',
                    'Authorization' : 'Bearer ' + authToken
                },
                body: JSON.stringify({id: this.props.data.id})
            })
            .then(res => res.json())
            .then(id => {
                this.props.removePost(id)
                if (this.props.userPost) {
                    this.props.tempRemove(id)
                }
                this.props.tempRemove(id)
            })

            this.setState({
                ...this.state,
                verify:false
            })
        }

        toggleModalHandler = () => {
            this.setState({
                ...this.state,
                verify:false
            })
        }

        verifyDeleteHandler = (result) => {
            if (result === true) {
                this.deletePost();
            } else {
                this.setState({
                    ...this.state,
                    verify:false
                })
            }
        }


    render() {
       
        const post = this.props.data;
        let deleteButton;
        if ((this.props.data.authorId === this.props.userId) || this.props.userPost) {
            deleteButton = <span onClick={this.deletePostHandler} className="post-delete">delete</span>
        }
        let modal;
        if (this.state.verify) {
            modal = <Modal active toggle={this.toggleModalHandler}><Verify verify={this.verifyDeleteHandler}/></Modal>
        }
        return (
            <div className="post-container">
                {modal}
                <div className="post-user">
                    <Profile id={this.props.id}/>
                    <h1>{post.author_fname + " " + post.author_lname}</h1>
                    <h3>{this.getDaysAgo()}</h3>
                    {deleteButton}
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
                <PostActions 
                    liked={this.state.liked} 
                    postData={{...post}} 
                    likeClicked={()=> this.likeToggleHandler()} 
                    commentClicked={this.newCommentHandler}
                    addingComment={this.state.addingComment}/>
                <CommentsView 
                    active={this.state.commentsToggled} 
                    post={post} 
                    extra={this.state.recentComments} 
                    comments={[...this.state.persistedComments]}
                    removeComment={this.removePostedComment} 
                    newComment={this.state.addingComment} 
                    addComment={this.renderNewComment}
                    />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        token: state.auth.token,
        user:state.user
    }
}



export default connect(mapStateToProps)(Post);
