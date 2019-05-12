import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignments } from '../../Actions/assignmentActions.js';

import '../../App.css';

class Assignments extends Component {
  componentDidMount() {
    this.props.getAssignments();
  };

  render() {
    const assignments = this.props.assignments.assignments;
    let assignmentList;
    assignmentList = assignments.map(assignment => {
      let description = assignment.description
      return (
        <div className="list">
          <p id="assignmentName">{assignment.name}</p>
          <div id="assignmentDesc" dangerouslySetInnerHTML={{__html: description}} />
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
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assignments: state.assignments
});

export default connect(mapStateToProps, { getAssignments })(Assignments);
