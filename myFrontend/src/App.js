import React, { useState } from 'react';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NewArticle from './components/NewArticle';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import './App.css';

export default function App() {
  const [logIN, setLogin] = useState(false);
 
  return (
    <div className="App">

      <Route exact path="/register" component={Register} />
      <Route exact path="/login" render={() => <Login func={setLogin} />} />
      <Route exact path="/deshboard" component={Dashboard} />
      <Route exact path="/newArticle" component={NewArticle} />
    </div>
  );
}



