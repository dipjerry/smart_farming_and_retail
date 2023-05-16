import React, { useState } from 'react';
import axios from 'axios';
import cart from './cart'; 

const BackendHandler = () => {
  const [cart, setCartData] = useState([]);

  // Function to send data to the backend
  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://your-backend-url.com/api/endpoint', cart);
      console.log('Data sent successfully to the backend:', response.data);
      // Handle the response from the backend here
    } catch (error) {
      console.error('Error sending data to the backend:', error);
      // Handle any errors that occur during the request
    }
  };

  // Function to fetch cart data from another file
  const fetchCartData = () => {
    setCartData(Cart); // Assuming CartData is an array of cart items
  };

  return (
    <div>
      {/* Button to fetch cart data from another file */}
      <button onClick={fetchCartData}>Fetch Cart Data</button>

      {/* Button to send data to the backend */}
      <button onClick={sendDataToBackend}>Send Data to Backend</button>
    </div>
  );
};

export default BackendHandler;


// const mongoose=require("mongoose");
// const cartSchema=mongoose.schema({
//     product_id:{
//         type:string,
//         required:true
//     },
//     name:{
//         type:string,
//         required:true
//     },
//     description:{
//         type:string,
//         required:true
//     },
//     price:{
//         type:string,
//         required:true
//     }
// })
// module.exports=mongoose.model("cart",cartSchema);
