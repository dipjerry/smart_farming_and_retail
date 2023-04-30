import axios from 'axios';
const endpoint = process.env.REACT_APP_TEST_URL;

let token = null;
const config = {
  headers: {'content-type': 'multipart/form-data'},
};
const API = require('./apis');
async function checkLogin() {
    const authToken = sessionStorage.getItem('token');
    if (authToken) {
      token = {headers: {Authorization: `Bearer ${authToken}`}};
    } else {
      window.location.href = '/sign-in';
    }
  }

export default class payment{

  static createOrder = async (data) => {
    try {
      const res = await axios.post(endpoint + `/v1/createOrder`, data);
      return res.data;
    } catch (error) {
      console.log(error.data)
        return error.data;
    }
  }; 

  static createOfflineOrder = async (data) => {
    try {
      const res = await axios.post(endpoint + `/v1/createofflineOrder`, data);
      return res.data;
    } catch (error) {
      console.log(error.data)
        return error.data;
    }
  };

  static onlinePaymentVerify = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(endpoint + `/v1/payment/verifyPaymentOrder`, data);
      return res.data;
    } catch (error) {
      console.log(error.data)
        return error.data;
    }
  }; 

}

