import axios from 'axios';
// const API = require('./apis');
const endpoint = `http://localhost:4007`;

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

export default class kyc{
    static pan = async (data) => {
        try {
          const res = await axios.post(endpoint + `/user/kyc/verify_and_add_pan`, data);
          console.log(res);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };
    static aadhar = async (data) => {
        try {
          const res = await axios.post(endpoint + `/user/kyc/verify_and_add_aadhar`, data);
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

    static profile = async (data) => {
        try {
          const res = await axios.post(endpoint + `/user/profile`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };
}