import React from 'react';
import {ReactComponent as BackgroundSVG} from '../../assets/profile_background.svg';
import './Profile.css';

// This component will hold the unique profile picture uploaded by the client
// http://lorempixel.com/400/200/ is a placeholder image until feature is executed

const profile = props => {
    let background = null;
    if (props.header) {
        background = (
            <BackgroundSVG className="profile-background" />
        );
    }
  

    const getrandImage = () => {
        return `https://loremflickr.com/200/200?${props.id}`
    }

    return(
        <div 
            className="profile-image-container"
            onClick={props.clicked}
            >
             <img 
                crossOrigin="anonymous"
                className="profile-image" 
                src={getrandImage()}
                alt="placeholder user"
                />
                {background}
        </div>
    );
}

export default profile;