import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../Actions/authenticationActions.js';


class Navbar extends Component {
  onLogout = (event) => {
    event.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const isAuthLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a onClick = {this.onLogout.bind(this)} className="nav-link" style={{cursor:"pointer"}}>
            {' '}
            Log Out
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-light mb-4" style={{fontFamily:"Avenir",fontWeight:"bold",padding:"5px"}}>
        <div className="container">
          <Link className="navbar-brand" to="/">Sup</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? isAuthLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
