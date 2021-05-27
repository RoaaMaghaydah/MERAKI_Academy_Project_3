import React, { useState } from 'react';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NewArticle from './components/NewArticle';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import './App.css';

export default function App() {
  const [token, setToken] = useState(false);
 console.log("token1111:::",token)
  return (
    <div className="App">
      <Navigation tokenS={token}/>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" render={() => <Login func={setToken} />} />
      <Route exact path="/deshboard" component={Dashboard} />
      <Route exact path="/newArticle" component={NewArticle} />
    </div>
  );
}



const Navigation = ({token}) => {
  console.log("token:::",token)
  return (    <>
  
    {token?<div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
          <Link to="/deshboard">Deshboard</Link>
          <Link to="/newArticle">NewArticle</Link>
      </div>:""}

    {!token?<div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
      </div>:""}
      
      </>
  );
};
