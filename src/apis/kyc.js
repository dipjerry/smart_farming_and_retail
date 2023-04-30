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

export default class kyc{
    static pan = async (data) => {
        try {
          const res = await axios.post(endpoint + `/v1/kyc/verify_and_add_pan`, data);
          console.log(res);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };
    static aadhar = async (data) => {
        try {
          const res = await axios.post(endpoint + `/v1/kyc/verify_and_add_aadhar`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };

    static bank = async (data) => {
        try {
          const res = await axios.post(endpoint + `/v1/kyc/verify_and_add_bank`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };

    static other = async (data) => {
        try {
          const res = await axios.post(endpoint + `/v1/kyc/add_other`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };
}