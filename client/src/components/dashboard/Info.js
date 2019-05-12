import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Info extends Component {

  render() {
    const user = this.props.auth.user;
    const userInfo = this.props.auth.userInfo;
    const webTokenInfo = this.props.auth.webTokenInfo;
    let content;
        content = (
          <div>
            <p
              className="lead"
              style={{fontSize:"35px",color:"rgba(255,255,255,0.9)"}}
              >
              Welcome { user.name }
            </p>
            <p>Here is some info...</p>
            <p>Email: { userInfo.email }</p>
            <p>Password: { userInfo.password }</p>
            <div style={{wordWrap:"break-word"}}>
            <p>Web Token: <br></br>{ webTokenInfo.token }</p>
            </div>
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

Info.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authenticate
});

export default connect(mapStateToProps)(Info);
