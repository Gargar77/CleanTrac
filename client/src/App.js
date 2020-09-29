import React from 'react';
import { Route,Switch } from 'react-router-dom';

import './App.css';
import Auth from './containers/Auth';
import Accounts from './containers/Accounts';


function App(props) {
  return (
 
    <div className="App">
      <Switch>
        <Route path="/accounts" exact component={Accounts}/>
        <Route path="/auth" exact component={Auth}/>
        
      </Switch>
    </div>
  );
}

export default App;
