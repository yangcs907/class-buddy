import axios from 'axios';

const setAuthWebToken = (webToken) => {
  if (webToken) {
    // apply to every request
    axios.defaults.headers.common['Auth'] = webToken;
  } else {
    delete axios.defaults.headers.common['Auth'];
  }
};

export default setAuthWebToken;
