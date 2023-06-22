import React, { useState, useEffect } from "react";
import Cta1 from "../../assets/plugins/images/cta/cta1.png";
import { RightCircleOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

function NotFound() {
const navigate = useNavigate();

// useEffect(() => {
//   alert(props.data);
//   if(props.data=="investor"){
//     navigate("/login");
//   }
//   else if(props.data=="startup")
//   {
//     navigate("/Startup/login");
//   }
//   else{
//     navigate("/Admin/login");
//   }
//     // console.log(props.data);
// }, []); 
  return (
    <div className="static">
      {/* <h1>Risk of Investment</h1> */}
      <div className="flex gap-x-8">
        <div className="static-container">
        Page not found Not Found
        </div>
        
      </div>
    </div>
  );
}

export default NotFound;
