import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Assignments from './Assignments.js';

import '../../App.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      showAssignments: true,
      createAssignment: false
    }
  };
  showAssignments = () => {
    if (!this.state.showAssignments) {
      this.setState({
        showAssignments: true,
        createAssignment: false
      });
    };
  };
  showCreate = () => {
    if (!this.state.createAssignment) {
      this.setState({
        showAssignments: false,
        createAssignment: true
      });
    };
  };

  render() {
    const user = this.props.auth.user;
    let activeAssignmentShow;
    let activeCreate;
    let currentContent;
    if (this.state.showAssignments) {
      activeAssignmentShow = {
        color: "rgba(0,223,255,1)"
      }
      currentContent = <Assignments />
    } else {
      activeAssignmentShow = {
        color: "black"
      }
    }
    if (this.state.createAssignment) {
      activeCreate = {
        color: "rgba(0,223,255,1)"
      }
      currentContent = ''
    } else {
      activeCreate = {
        color: "black"
      }
    }

    return (
      <div className="dashboard">
        <h5 id="dashHeader">Welcome <span id="username">{ user.name }</span></h5>
        <p id="dashDesc">This is your dashboard. Here you can view assignments or create assignments for your class</p>
          <div className="row" id="dashOptionRow">
            <div className="col s6 m6">
              <h5 id="dashOptionHeader" style={activeAssignmentShow} onClick={this.showAssignments}>List</h5>
            </div>
            <div className="col s6 m6">
              <h5 id="dashOptionHeader" style={activeCreate} onClick={this.showCreate}>Create</h5>
            </div>
          </div>
          {currentContent}
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
