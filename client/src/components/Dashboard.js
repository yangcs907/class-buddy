import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

  render() {
    const user = this.props.auth.user;
    let content;
        content = (
          <div>
            <p
              className="lead"
              style={{fontSize:"35px",color:"rgba(255,255,255,0.9)"}}
              >
              Welcome { user.name }
            </p>
            <Link to='/info' className="btn btn-lg btn-info">Show Info</Link>
            <Link to='/assignments' className="btn btn-lg btn-info">Assignments</Link>
          </div>
        );
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {content}
            </div>
          </div>
        </div>
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
