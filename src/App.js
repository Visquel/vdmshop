import React from 'react'
import Nav from './components/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import Home from './components/Home'

import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/PrivateRoute";
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import ShowDetails from './components/ShowDetails'


if (localStorage.jwtToken) {
  
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {

  return (
    <div className="App">
    <Provider store={store}>
      <Router>
        <Nav />
        <Route path="/" exact component={Landing} />  
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />    
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute path="/show-details/:id" component={ShowDetails} />
        </Switch>
      </Router>
    </Provider>
    </div>
  )
}

export default withRouter(App)
