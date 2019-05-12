import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssignments } from '../../Actions/assignmentActions.js';
import axios from 'axios';

class Assignments extends Component {
  getAssignments = () => {
    axios
      .get('/api/course/assignments')
      .then(res => {
        console.log(res.data);
        console.log("hello");
      })
      .catch(err => {
        console.log(err);
      })
  };
  render() {
    return (
      <div>
      <h1>Assignments</h1>
      <button onClick={() => this.getAssignments()}>Show Assignments</button>
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
