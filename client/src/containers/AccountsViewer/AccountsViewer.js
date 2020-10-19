import React, {Component} from 'react';
import './AccountsViewer.css';
import {connect} from 'react-redux';

import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';
import Account from '../../components/Account/Account';


class AccountsViewer extends Component {

    componentDidMount() {
        if(this.props.isAuthenticated) {
            this.props.onGetAccounts(this.props.token)
        }
    }

    


    getAccounts = () => {
        let accounts = [...this.props.accounts]
        let accountList = accounts.map((account,index)=> {
        return <Account key={index} accountData={account} removeRenderedPost={this.props.removeRenderedPost} toggleM={this.props.toggle}/>
        })
        // let newPosts = (
        //     <Account userPosts removepost={this.removePost} accountData={this.state.extra}/>
        // )

        // accountList.unshift(newPosts);
        return accountList;
    }

    render() {

        let content;
        let loadingText;
        if (this.props.accounts) {
            content = this.getAccounts();
        } else {
            content = <div className="accounts-spinner"><Spinner/></div>
            loadingText = <p className="loading-text">loading accounts...</p>
        }

        return(
            <div className="posts-viewer-container" >
                {this.props.children}
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

export default connect(mapStateToProps,mapDispatchToProps)(AccountsViewer);