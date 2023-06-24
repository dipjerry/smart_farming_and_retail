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
      static fetchuser = async (data) => {
        try {
          const res = await axios.get(endpoint + `/user/all`, {
            params:{
              role:'admin',
              id:data
            }
          });
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      }; 
      static fetchproduct = async (data) => {
        try {
          const res = await axios.get(endpoint + `/product/products`, {
            params:{
              role:'admin',
              id:data
            }
          });
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      }; 
      static createUserAdd = async (data) => {
        try {
          const res = await axios.post(endpoint + `/user/signup`, data);
          console.log(res);
          return res.data;
        } catch (error) {
          console.log(error.data);
          return error.data;
        }
      };
}