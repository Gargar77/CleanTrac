import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth';
import Accounts from './containers/Accounts';



class App extends Component {

  render() {
    return  (
         <div className="App">
          <Route path="/accounts" exact component={Accounts}/>
          <Route path="/auth" exact component={Auth}/>
        </div>
     
    );
  }
}



export default App;
