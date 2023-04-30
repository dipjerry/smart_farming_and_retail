import axios from 'axios';

const endpoint = process.env.REACT_APP_TEST_URL;

let token = null;

const config = {
  headers: {'content-type': 'multipart/form-data'},
};



async function checkLogin() {
    const authToken = sessionStorage.getItem('token');
    if (authToken) {
      token = {headers: {Authorization: `Bearer ${authToken}`}};
    } else {
      window.location.href = '/sign-in';
    }
  }

  
export default class Api {

}