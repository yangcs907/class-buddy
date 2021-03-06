import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthWebToken from './utils/setAuthWebToken.js';
import { setCurrentUser, logoutUser } from './Actions/authenticationActions.js';
import { Provider } from 'react-redux';
import store from './Store';
import PrivateRoutes from './components/privateroutes/PrivateRoutes.js';

import './App.css';

import Header from './components/layout/Header.js';
import Home from './components/layout/Home.js';
import Footer from './components/layout/Footer.js';
import Register from './components/authentication/Register.js';
import Login from './components/authentication/Login.js';
import Dashboard from './components/dashboard/Dashboard.js';

if (localStorage.jwtToken) {
  setAuthWebToken(localStorage.jwtToken);
  const decodedToken = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedToken));
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
};

class App extends Component {
  render() {
    return (
      <Provider store= { store }>
        <Router>
          <div className="App">
            <Header />
            <Route exact path = "/" component = {Home} />
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/login" component = {Login} />
              <Switch>
                <PrivateRoutes exact path = "/dashboard" component = {Dashboard} />
              </Switch>
          </div>
          <Footer />
        </Router>
      </Provider>
    );
  }
};

export default App;
