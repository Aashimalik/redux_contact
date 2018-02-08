import axios from 'axios'
import { getCookie } from './lib/helper';


axios.defaults.baseURL = ( process.env.NODE_ENV !== 'production') ? 'http://localhost:8000/' : '/adminapi/';


axios.interceptors.request.use( function(config) {
 
  const token = getCookie('token'); 
  if( token ) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }
  return config;
}, function (error) {
 
  return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {

    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });