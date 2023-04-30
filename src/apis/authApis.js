import axios from "axios";

const endpoint = process.env.REACT_APP_TEST_URL;

let token = null;

const config = {
  headers: { "content-type": "multipart/form-data" },
};

const API = require("./apis");

async function checkLogin() {
  const authToken = sessionStorage.getItem("token");
  if (authToken) {
    token = { headers: { Authorization: `Bearer ${authToken}` } };
  } else {
    window.location.href = "/sign-in";
  }
}

export default class auth {
  static signupComplete = async (data) => {
    try {
      const res = await axios.post(
        endpoint + `/v1/auth/email-signup-complete`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.data);
      return error.data;
    }
  };

  static RegisterOTPVerify = async (data, _headers) => {
    try {
      const res = await axios.post(
        endpoint + `/v1/auth/verify-register-otp`,
        data,
        _headers
      );
      return res.data;
    } catch (error) {
      console.log(error.data);
      return error.data;
    }
  };

  static LocalLogin = async (api, data, _headers) => {
    try {
      const res = await axios.post(api, data, _headers);
      return res.data;
    } catch (error) {
      console.log(error.data);
      return error.data;
    }
  };
}
