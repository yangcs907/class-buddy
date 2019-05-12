import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignments } from '../../Actions/assignmentActions.js';
import axios from 'axios';

class Assignments extends Component {
  constructor() {
    super();
    this.state = {
      showAssignments: true,
      createAssignment: false
    }
  };

  componentDidMount() {
    this.props.getAssignments();
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
  displayAssignments = () => {
    return this.props.assignments.assignments.map(assignment => {
      return (
        <div>
          <p>{assignment.name}</p>
          <p>{assignment.description}</p>
        </div>
      )
    })
  };

  render() {
    const assignments = this.props.assignments.assignments;
    let assignmentList;
    let createAssignment;
    assignmentList = assignments.map(assignment => {
      let description = assignment.description
      return (
        <div className="list">
          <p id="assignmentName">{assignment.name}</p>
          <div id="assignmentDesc" dangerouslySetInnerHTML={{__html: description}} />
        </div>
      )
    });
    createAssignment = (
      <div>Create assignment goes here</div>
    );
    let activeAssignmentShow;
    let activeCreate;
    if (this.state.showAssignments) {
      activeAssignmentShow = {
        color: "rgba(0,223,255,1)"
      }
    } else {
      activeAssignmentShow = {
        color: "black"
      }
    }
    if (this.state.createAssignment) {
      activeCreate = {
        color: "rgba(0,223,255,1)"
      }
    } else {
      activeCreate = {
        color: "black"
      }
    }

    return (
      <div className="assignmentsList">
        <div className="row" id="dashOptionRow">
          <div className="col s6 m6">
            <h5 id="dashOptionHeader" style={activeAssignmentShow} onClick={this.showAssignments}>List</h5>
          </div>
          <div className="col s6 m6">
            <h5 id="dashOptionHeader" style={activeCreate} onClick={this.showCreate}>Create</h5>
          </div>
        </div>
        {this.state.showAssignments ? assignmentList : ''}
        {this.state.createAssignment ? createAssignment : ''}
      </div>
    );
  };
};

Assignments.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assignments: state.assignments
});

export default connect(mapStateToProps, { getAssignments })(Assignments);
