import React, {Component} from 'react';
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import * as actions from './store/actions/index';
import LoadScreen from './components/UI/LoadScreen/LoadScreen';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  


  render() {

    let loader = null;
    if (this.props.loading) {
      loader = <LoadScreen>loading user...</LoadScreen>
    }

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
        <Route path="/home" exact component={Home}/>
        <Redirect to="/home"/>
      </Switch>
      
      );
    }

    return  (
         <div className="App">
            {loader}
            {content}
        </div>
     
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading
  }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
