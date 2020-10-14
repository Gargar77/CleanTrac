import React from 'react';
import './PostActions.css';

import {ReactComponent as ThumbUpSmallSVG} from '../../assets/thumb_up_small.svg';
import {ReactComponent as CommentSVG} from '../../assets/comment.svg';
import {ReactComponent as ShareSVG} from '../../assets/share.svg';
import {ReactComponent as ThumbUpColorSVG} from '../../assets/thumb_up_large.svg';


const postActions = props => {
    let thumbUp;
    let likeText;
    if (props.liked) {
        thumbUp = <ThumbUpColorSVG/>
        likeText = <span className="post-action__unlike-text">unlike</span>
    } else {
        thumbUp = <ThumbUpSmallSVG/>
        likeText = <span className="post-action__like-text">like</span>
    }

    return(
        <div className="post-actions">
            <div onClick={props.likeClicked} className="post-action__like">
                {thumbUp}
                {likeText}
            </div>
            <div onClick={props.commentClicked} className="post-action__comment">
                <CommentSVG/>
                <span>comment</span>
            </div>
            <div className="post-action__share">
                <ShareSVG/>
                <span>share</span>
            </div>
        </div>
    );
}

export default postActions