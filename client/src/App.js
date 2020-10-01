import React, {Component} from 'react';
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth';
import Accounts from './containers/Accounts';



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
      <Route path="/accounts" exact component={Accounts}/>
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
