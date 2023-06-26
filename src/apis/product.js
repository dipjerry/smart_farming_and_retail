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
      static productPickup = async (data) => {
        try {
          const res = await axios.post(endpoint + `/transact/productPickup`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      };
      static productDelivery = async (data) => {
        try {
          const res = await axios.post(endpoint + `/transact/productDelivery`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      };

      // static buyProduct = async (data) => {
      //   try {
      //     const res = await axios.post(endpoint + `/transact/buyProduct`, data);
      //     return res.data;
      //   } catch (error) {
      //     console.log(error.data)
      //     return error.data;
      //   }
      // };

      static fetchShopProduct = async (data) => {
        try {
          const res = await axios.get(endpoint + `/product/shopProduct`, {
            params:data
          });
          console.log('res Api');
          console.log(res);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };
      static buyRawProduct = async (data) => {
        try {
          const res = await axios.post(endpoint + `/product/raw_products`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };
      static listProduct = async (data) => {
        try {
          const res = await axios.post(endpoint + `/transact/listItem`, data);
          return res.data;
        } catch (error) {
          console.log(error.data)
            return error.data;

        }
      };
    }