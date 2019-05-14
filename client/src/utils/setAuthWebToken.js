// sets web token in header
import axios from 'axios';

const setAuthWebToken = (webToken) => {
  if (webToken) {
    axios.defaults.headers.common['Auth'] = webToken;
  } else {
    delete axios.defaults.headers.common['Auth'];
  }
};

export default setAuthWebToken;
