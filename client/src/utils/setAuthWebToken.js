// sets web token in header
import axios from 'axios';

const setAuthWebToken = (webToken) => {
  if (webToken) {
    axios.defaults.headers.common['Authorization'] = webToken;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthWebToken;
