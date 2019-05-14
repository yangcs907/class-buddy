// Component for Footer
import React, { Component } from 'react';

import '../../App.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p id="footerText">&copy;Class Buddy by <span style={{color:"rgba(0,223,255,1)"}}>Chris Yang</span></p>
      </div>
    )
  }
}

export default Footer;
