const getBaseUrl = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
    return 'http://localhost:3000/api';
  } else {
    return 'https://jalf.herokuapp.com/api';
  }
};

export default getBaseUrl;
