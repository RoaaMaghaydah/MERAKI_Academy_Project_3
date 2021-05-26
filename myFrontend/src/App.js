import React from 'react';
import Register from './components/Register';
import login from './components/Login';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import './App.css';
import Login from './components/Login';

export default function App() {
  return (
    <div className="App"> 
      <p>App</p>
      <Navigation />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />

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
