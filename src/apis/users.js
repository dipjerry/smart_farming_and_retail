import axios from "axios";
const endpoint = `http://localhost:4007`;

let token = null;
const config = {
  headers: { "content-type": "multipart/form-data" },
};

async function checkLogin() {
  const authToken = sessionStorage.getItem("token");
  if (authToken) {
    token = { headers: { Authorization: `Bearer ${authToken}` } };
  } else {
    window.location.href = "/sign-in";
  }
}


export default class startup{
    
    static StartupForm = async (data) => {
        try {
          const res = await axios.post(endpoint + `/v1/startup/register`, data);
          console.log(res);
          return res.data;
        } catch (error) {
          console.log(error.data);
          return error.data;
        }
      };

    static action = async (data) => {
        try {
console.log("approved");
          const res = await axios.post(endpoint + `v1/startup/action`, data);
          console.log(res);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        } 
      }; 
   

    static delete = async (data) => {
        try {
          const res = await axios.post(endpoint + `/v1/startup/delete`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };

    static login = async (data) => {
        try {
          const res = await axios.post(endpoint + `/user/signin/manufacturer`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;
        }
      };
    static loginAdmin = async (data) => {
        try {
          const res = await axios.post(endpoint + `/user/signin/manufacturer`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;
        }
      };

    static fetch = async (data) => {
        try {
          const res = await axios.post(endpoint + `/v1/kyc/add_other`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;
        }
      }; 
    static fetchTransaction = async (data) => {
        try {
          const res = await axios.get(endpoint + `/transact/listInvoice`, {params:data});
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      }; 
      static fetchUserbyrole = async (data) => {
        try {
          // const params = { role }; // Create an object with the role parameter
          const res = await axios.get(`${endpoint}/user/userbytype`, { params : data });
          console.log('Response:', res.data);
          return res.data;
        } catch (error) {
          console.log('Error:', error);
          return error.data;
        }
      };
      static fetchUserbyById = async (data) => {
        try {
          // const params = { role }; // Create an object with the role parameter
          const res = await axios.get(`${endpoint}/user/userbyid`, { params : data });
          console.log('Response:', res.data);
          return res.data;
        } catch (error) {
          console.log('Error:', error);
          return error.data;
        }
      };
}