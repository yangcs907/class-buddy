// Component for assignment list (child of dashboard)
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignments, deleteAssignment } from '../../Actions/assignmentActions.js';

import '../../App.css';

class Assignments extends Component {
  componentDidMount() {
    this.props.getAssignments();
  };

  render() {
    const assignments = this.props.assignments.assignments;
    let assignmentList;
    // maps through assignments array of objects (from redux state)
    assignmentList = assignments.map(assignment => {
      let description = assignment.description;
      let assignmentId = assignment.id;
      return (
        <div className="list" key={assignment.id}>
          <p id="assignmentName">{assignment.name}</p>
          <p id="maxPoints">Max Points:{' '}<span id="pointsPossible">{assignment.points_possible}</span></p>
          <div id="assignmentDesc" dangerouslySetInnerHTML={{__html: description}} /> {/*Description includes HTML tags in string, need to use dangerouslySetInnerHTML*/}
          <p className="deleteButton" onClick={() => this.props.deleteAssignment(assignmentId)}><i className="fas fa-trash-alt"/>{' '}Delete</p>
        </div>
      )
    });

    return (
      <div className="assignmentsList">
        {assignmentList}
      </div>
    );
  };
};

Assignments.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assignments: state.assignments
});

export default connect(mapStateToProps, { getAssignments, deleteAssignment })(Assignments);
