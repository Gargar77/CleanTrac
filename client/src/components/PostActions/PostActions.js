import React from 'react';
import './PostActions.css';

import {ReactComponent as ThumbUpSmallSVG} from '../../assets/thumb_up_small.svg';
import {ReactComponent as CommentSVG} from '../../assets/comment.svg';
import {ReactComponent as ShareSVG} from '../../assets/share.svg';


const postActions = props => {
    return(
        <div className="post-actions">
            <div className="post-action__like">
                <ThumbUpSmallSVG/>
                <span>like</span>
            </div>
            <div className="post-action__comment">
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