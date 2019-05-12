import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Assignments from './Assignments.js';

import '../../App.css';

class Dashboard extends Component {

  render() {
    const user = this.props.auth.user;

    return (
      <div className="dashboard">
        <h5 id="dashHeader">Welcome <span id="username">{ user.name }</span></h5>
        <p id="dashDesc">This is your dashboard. Here you can view assignments or create assignments for your class</p>
        <Assignments />
      </div>
    );
  };
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authenticate
});

export default connect(mapStateToProps)(Dashboard);
