import React from 'react';
import Register from './components/Register';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div>
      <p>App</p>
      <Navigation />
      <Route exact path="/register" component={Register} />
      {/* <Route exact path="/about" component={About} />*/}
     
    </div>
  );
}


const Navigation = () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Link to="/register">Register</Link>
    </div>
  );
};
