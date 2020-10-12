import React from 'react';
import './Post.css';
import Profile from '../Profile/Profile';


const post = props => {

    const randomUpload = () => {
        let randIdx = Math.round(Math.random(10));
        if (randIdx % 2 === 0) {
            return `https://loremflickr.com/400/200?${randIdx + Math.random(100)}`
        } else {
            return ""
        }
    }

    const getDaysAgo = () => {
       let day =  Math.round(parseInt(post.created))
       if (day <= 0) {
           return 'now'
       } else {
           return `${day} days`
       }
    }

    const post = props.data;
    return (
        <div className="post-container">
            <div className="post-user">
                <Profile id={props.id}/>
                <h1>{post.author_fname + " " + post.author_lname}</h1>
                <h3>{getDaysAgo()}</h3>
            </div>
            <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div className="post-upload-container">
                    <img
                        src={randomUpload()}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default post;
