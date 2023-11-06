import React from 'react';
import './App.css';
import axios from 'axios';
import Registration from './components/Registration';

//config defaults that will be applied to every request
axios.defaults.baseURL = '//https://localhost:3001';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();



//handling errors
 // Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get('/longRequest', {
  timeout: 5000
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.get('/user',{
  signal: AbortSignal.timeout(5000), //Aborts request after 5 seconds
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
})

axios.get('/user')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    //console.log(error.config);
  });

  //Using toJSON you get an object with more information about the HTTP error.
  // axios.get('http://localhost:3000/user')
  //   .catch(function (error) {
  //   console.log(error.toJSON());
  // });

function App() {

  // Want to use async/await? Add the `async` keyword to your outer function/method.
  async function getUser() {
    try {
      const response = await axios.get('/user/');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }
  getUser();
  
  return (
    
    <div className='App'>
      {/* <Login /> */}
      <Registration />
    </div>
    
  );
  
}

export default App;
