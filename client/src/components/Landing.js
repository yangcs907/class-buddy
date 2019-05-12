import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Sup
                </h1>
                <p className="lead">Register and Sign Up!</p>
                <Link to="/register" className="btn btn-lg btn-info mr-2" style={{backgroundColor:"rgba(0,0,0,0.5)",borderColor:"none"}}>Register</Link>
                {'  '}
              <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps)(Landing);
