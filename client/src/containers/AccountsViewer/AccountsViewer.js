import React, {Component} from 'react';
import './AccountsViewer.css';
import {connect} from 'react-redux';

import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';
import Account from '../../components/Account/Account';


class PostsViewer extends Component {

componentDidMount() {
    if(this.props.isAuthenticated) {
        this.props.onGetAccounts(this.props.token)
    }
}

getPosts = () => {
    let accounts = [...this.props.accounts]
    let posts = accounts.map((account,index)=> {
       return <Account key={index} accountData={account}/>
    })
    return posts;
}

    render() {

        let content;
        let loadingText;
        console.log(this.props.accounts)
        if (this.props.accounts) {
            content = this.getPosts();
        } else {
            content = <div className="accounts-spinner"><Spinner/></div>
            loadingText = <p className="loading-text">loading accounts...</p>
        }

        return(
            <div className="posts-viewer-container">
                {content}
                {loadingText}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error:state.accounts.error,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        loading: state.accounts.fetching,
        accounts:state.accounts.entities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAccounts: (token) => dispatch(actions.fetchAccountsData(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostsViewer);