import React from 'react';
import './LikeStatus.css';
import {ReactComponent as ThumbStatusSVG} from '../../../assets/thumb_up_large.svg';


const likeStatus = props => {

    const userLike = () => {
        if (props.liked) {
            return 1
        } else {
            return 0
        }
    }

    return(
        <div className="like-status-container">
            <ThumbStatusSVG/>
    <p className="like-status-counter">{props.likes + userLike() || "10"}</p>
        </div>

    );
}

export default likeStatus;

