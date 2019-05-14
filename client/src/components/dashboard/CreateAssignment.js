import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getAssignments, deleteAssignment } from '../../Actions/assignmentActions.js';

import '../../App.css';

class CreateAssignment extends Component {
  constructor() {
    super();
    this.state = {
      maximumAssingments: false,
      assignmentName: '',
      assignmentPoints: '',
      assignmentDescription: '',
      descriptionTitle: '',
      descriptionBody: '',
      descriptionQuestions: []
    }
  };

  render() {
    const assignments = this.props.assignments.assignments;
    let createAssignmentForm;
    let maximumMessage;
    createAssignmentForm = (
      <div>
      </div>
    );

    return (
      <div className="createAssignment">
        <h5>Create assignment here</h5>
      </div>
    );
  };
};

CreateAssignment.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assignments: state.assignments
});

export default connect(mapStateToProps, { getAssignments, deleteAssignment })(CreateAssignment);
