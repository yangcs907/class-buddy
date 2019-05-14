// Component for registration of new user
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../Actions/authenticationActions.js';
import TextInput from '../inputs/TextInput.js';
import '../../App.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const errors = this.state.errors;

    return (
        <div className="register">
          <div className="row">
              <h1 id="registerHead"><i className="fas fa-user-edit" id="icon" />{' '}Register</h1>
              <p id="registerDesc">Create Instructor Account</p>
              <form onSubmit={this.handleFormSubmit}>
                <TextInput
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  error={errors.name}
                  />
                <TextInput
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  error={errors.email}
                  />
                <TextInput
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  error={errors.password}
                  />
                <TextInput
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleInputChange}
                  error={errors.password2}
                  />
                <input type="submit" id="submitButton"/>
              </form>
          </div>
        </div>
    )
  }
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate,
  errors: state.errorMessages
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
