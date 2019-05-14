// Component for creating assignment from (child of dashboard)
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAssignment } from '../../Actions/assignmentActions.js';
import TextInput from '../inputs/TextInput.js';
import TextArea from '../inputs/TextArea.js';

import '../../App.css';

class CreateAssignment extends Component {
  constructor() {
    super();
    this.state = {
      maximumAssingments: false,
      assignmentName: '',
      assignmentPoints: '',
      assignmentDescription: '',
      errors: ''
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const user = this.props.auth.user;
    const nameAssignment = this.state.assignmentName;
    // For SOME reason, if assignmentName includes "#", the post will not work (everything will be empty after the #...glitch?) so.....we make sure to remove any "#"
    const parsedName = nameAssignment.replace(/#/g, "");
    // Canvas API stores description as HTML string, need to add HTML tags before posting
    // Also for SOME reason, if body has "#"....it won't work...so we make sure to remove all "#"
    const text = this.state.assignmentDescription;
    const parsedText = text.replace(/#/g, "");
    const parsedTextAgain = parsedText.replace(/(\r\n|\n|\r)/gm, "<br></br>"); // replaces new line with break <br> tags
    const finalParsedText = "<p>" + parsedTextAgain + "</p>" + `<p>Instructor: ${user.name}</p>`; // adds <p> tags
    const newAssignment = {
      assignmentName: parsedName,
      assignmentPoints: this.state.assignmentPoints,
      assignmentDescription: finalParsedText
    };
    this.props.createAssignment(newAssignment);
    this.setState({
      assignmentName: '',
      assignmentPoints: '',
      assignmentDescription: ''
    })
  };

  render() {
    const errors = this.state.errors;
    let createAssignmentForm;
    createAssignmentForm = (
      <div>
        <form>
          <TextInput
            name="assignmentName"
            type="text"
            placeholder="Name of assignment"
            value={this.state.assignmentName}
            onChange={this.handleInputChange}
            error={errors.assignmentName}
            />
          <TextInput
            name="assignmentPoints"
            type="number"
            placeholder="Maximum points"
            value={this.state.assignmentPoints}
            onChange={this.handleInputChange}
            error={errors.assignmentPoints}
            />
          <TextArea
            name="assignmentDescription"
            type="text"
            placeholder="Assignment body"
            value={this.state.assignmentDescription}
            onChange={this.handleInputChange}
            error={errors.assignmentDescription}
            />
        </form>
        <p id="submitButton" onClick={this.handleFormSubmit} disabled={!this.state.assignmentName && !this.state.assignmentPoints && !this.state.descriptionBody}><i className="fas fa-pencil-alt"/>{' '}Create!</p>
    </div>
    );

    return (
      <div className="createAssignment">
        <h5>Create assignment here</h5>
        {createAssignmentForm}
      </div>
    );
  };
};

CreateAssignment.propTypes = {
  auth: PropTypes.object.isRequired,
  createAssignment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errorMessages,
  auth: state.authenticate,
  assignments: state.assignments
});

export default connect(mapStateToProps, { createAssignment })(CreateAssignment);
