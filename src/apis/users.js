import axios from "axios";
const endpoint = `http://localhost:4007`;
import NodeGeocoder from 'node-geocoder';
let token = null;
const config = {
  headers: { "content-type": "multipart/form-data" },
};


async function geocodeLocation(location) {
  try {
    const geocoderOptions = {
      provider: 'openstreetmap', // Replace with your desired provider (e.g., 'nominatim', 'google', etc.)
    };

    const geocoder = NodeGeocoder(geocoderOptions);

    const res = await geocoder.geocode(location);
    if (res && res.length > 0) {
      const { latitude, longitude } = res[0];
      console.log('Geocoding result:', latitude, longitude);
    } else {
      console.log('No geocoding results found.');
    }
  } catch (error) {
    console.error('Error geocoding location:', error);
  }
}

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
          const res = await axios.get(endpoint + `/transact/listInvoice`, {
            params: data,
            headers: { "ngrok-skip-browser-warning": "true" }
          });
          return res.data;
        } catch (error) {
          console.log(error.data)
          return error.data;
        }
      }; 

    static fetchUserbyrole = async (data) => {
        try {
          const res = await axios.get(`${endpoint}/user/userbytype`, {
            params: data,
            headers: { "ngrok-skip-browser-warning": "true" }
          });
          console.log('Response:', res.data);
          return res.data;
        } catch (error) {
          console.log('Error:', error);
          return error.data;
        }
      };

    static fetchUserById = async (data) => {
        try {
          const res = await axios.get(`${endpoint}/user/userbyid`, {
            params: data,
            headers: { "ngrok-skip-browser-warning": "true" }
          });
          console.log('Response:', res.data);
          return res.data;
        } catch (error) {
          console.log('Error:', error);
          return error.data;
        }
      };

      static fetchWeather = async (pincode) => {
        const API_KEY = 'dd1e27a390ca256e81a8c89f52255c58'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},IN&appid=${API_KEY}`;
        geocodeLocation('Assam');
        return axios.get(url)
          .then(response => {
            console.log("🚀 ~ file: users.js:139 ~ startup ~ fetchWeather= ~ response:", response)
            response.data
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
            return null;
          });
      }
}