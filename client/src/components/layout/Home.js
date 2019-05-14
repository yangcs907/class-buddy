import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import '../../App.css';

class Home extends Component {
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // };
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const user = this.props.auth.user;
    let authButtons;
    let authWords;
    let noauthWords;
    let noauthButtons;
    noauthButtons = (
      <div>
      <Link id="homeButtons" to="/register" style={{width:"100px"}} >Register</Link>
      <Link id="homeButtons" to="/login" style={{width:"100px"}}>Log In</Link>
      </div>
    );
    noauthWords = (
      <div>
      <h4>Welcome!</h4>
      <p>Class Buddy is a platform that allows instructors to easily view and create their course assignments!</p>
      </div>
  );
    authButtons = (
      <Link id="homeButtons" to="/dashboard" style={{width:"120px"}}>Dashboard</Link>
    );
    authWords = (
      <div>
      <h4>Welcome{' '}<span id="username">{user.name}</span></h4>
      <p>Looks like you are signed in, click below to go straight to your dashboard!</p>
      </div>
    );
    return (
      <div className="home">
        {isAuthenticated ? authWords : noauthWords}
        {isAuthenticated ? authButtons : noauthButtons}
      </div>
    )
  }
};

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps)(Home);
