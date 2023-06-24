import axios from "axios";
const endpoint = `https://dfab-2409-40e6-b-365f-5957-6c25-1e79-1342.ngrok-free.app`;

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

const headers = {
  "ngrok-skip-browser-warning": "true"
};

export default class Startup {
    
    static addProduct = async (data) => {
        try {
          const res = await axios.post(endpoint + `/product`, data);
          return res.data;
        } catch (error) {
          // console.log(error.data);
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

    static fetchByRole = async (data) => {
        try {
          console.log("boom go");
          const res = await axios.get(endpoint + `/product/productsbyRole`, {
            params: data,
            headers: headers
          });
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      };

    static fetchRawProduct = async (data) => {
        try {
          const res = await axios.get(endpoint + `/product/raw_products`, {
            params: data,
            headers: headers
          });
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      };

    static fetchInventory = async (data) => {
        try {
          const res = await axios.get(endpoint + `/user/inventory`, {
            params: data,
            headers: headers
          });
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      };

    static buyProduct = async (data) => {
        try {
          const res = await axios.post(endpoint + `/transact/buyProduct`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      };

    static selectLogistic = async (data) => {
        try {
          const res = await axios.post(endpoint + `/transact/selectLogistic`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      };
    }