import React, {Component} from 'react';
import './UserProfile.css';
import {connect} from 'react-redux';

class UserProfile extends Component {
    render() {
        return(
            <div className="user-container">
                <h1>User information</h1>
                <h2>{this.props.user.firstName + " " + this.props.user.lastName}</h2>
                <h3>{this.props.user.role}</h3>
                <p>{`Email: ${this.props.user.email}`}</p>
                <p>{`Phone: ${this.props.user.phone}`}</p>
            </div>
        );
          
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserProfile);