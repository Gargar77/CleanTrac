import React, {Component} from 'react';
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import Accounts from './containers/Accounts/Accounts';


class App extends Component {
  
  render() {
    let content = (
      <Switch>
        <Route path="/auth" exact component={Auth}/>
        <Redirect to="/auth"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      content = (
        // auth required routes
      <Switch>
        <Route path="/accounts" exact component={Accounts}/>
        <Redirect to="/accounts"/>
      </Switch>
      
      );
    }

    return  (
         <div className="App">
             {content}
        </div>
     
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(App));
