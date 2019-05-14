// Component for header (picture, logo, navigation bar)
import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../Actions/authenticationActions.js';

import '../../App.css';

const activeStyle = {
  color: "rgba(0,223,255,1)"
};

class Header extends Component {
  onLogout = (event) => {
    event.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const user = this.props.auth.user;

    const homeLink = (
      <NavLink to="/" className="navLink">
        <i className="fas fa-home" id="navIcon"/>{' '}Home
      </NavLink>
    );
    const registerLink = (
      <NavLink to="/register" activeStyle={activeStyle} className="navLink">
        <i className="fas fa-user-edit" id="navIcon"/>{' '}Register
      </NavLink>
    );
    const loginLink = (
      <NavLink to="/login" activeStyle={activeStyle} className="navLink">
        <i className="fas fa-sign-in-alt" id="navIcon"/>{' '}Login
      </NavLink>
    );
    const logoutLink = (
      <NavLink to="/login" activeStyle={activeStyle} className="navLink">
        <i className="fas fa-sign-out-alt" id="navIcon"/>{' '}<a href="#" id="logout" onClick={this.onLogout}>Logout</a>
      </NavLink>
    );
    const dashboardLink = (
      <NavLink to="/dashboard" activeStyle={activeStyle} className="navLink">
        <i className="fas fa-book-reader" id="navIcon"/>{' '}Dash
      </NavLink>
    );

    return (
      <div className="headerDiv">
        <nav>
          <div style={{height: '100px'}}>
            <div className="navBar">
            {homeLink}
            {isAuthenticated ? dashboardLink : registerLink}
            {isAuthenticated ? logoutLink : loginLink}
          </div>
          </div>
        </nav>
        <div className="titleDiv">
          <h4 id="titleName"><i className="fas fa-pencil-alt"id="icon"/>{' '}Class Buddy</h4>
        </div>
      </div>
    )
  }
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps, { logoutUser })(Header);
