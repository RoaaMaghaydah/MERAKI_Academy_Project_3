import React, { useState } from 'react';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import login from './components/Login';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import './App.css';
import Login from './components/Login';

export default function App() {
  const [logIN, setLogin] = useState(false);
  const loginStast=()=> {
    return setLogin();
  }
 
  return (
    <div className="App">
      <p>App</p>
      {<Navigation />}
      {/* <Route exact path="/register" component={Navigation} />
      <Route exact path="/login" component={Navigation} />*/}
      <Route exact path="/register" component={Register} />
      <Route exact path="/login"  render={() => <Login  func={loginStast}/>}/>
      <Route exact path="/deshboard" component={Dashboard} />
    </div>
  );
}


const Navigation = () => {
  return (
    <div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};
