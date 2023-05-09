import React, { useEffect, useRef, useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
// import { Container, Row, Col, Card, Table } from 'react-bootstrap';
// import Sidebar from "../Components/explore/sidebar";
// import Ccds from "../Components/explore/ccds";
// import Ccps from "../Components/explore/ccps";
// import Equity from "../Components/explore/equity";
// import Startup from "../Components/explore/startup";
// import Navbar from "../Components/Navbar1/Navbar1";
// import Footer2 from "../Components/Footer2/Footer2";
// import CompanyLogo3 from "../Images/CompanyLogo3.png";
// import API from "../Apis/startupApis";
import Navbar from "./nav";
import Sidebar from "./sidebar";
import Shop from "./shop";
import Inventory from "./inventory";

function Explorar() {

  const navigate = useNavigate();
  const [shop, setShop] = useState([
    {
    // logo: CompanyLogo3,
    registeredCompanyName: "boo",
    shortDescription: "fsdds",
    tags: "sdfsdf",
    colour: "#F0D9FF",
  },
    {
    // logo: CompanyLogo3,
    registeredCompanyName: "boo",
    shortDescription: "fsdds",
    tags: "sdfsdf",
    colour: "#F0D9FF",
  }
]);
//   const [startupsccps, setstartupsccps] = useState([{
//     logo: CompanyLogo3,
//     registeredCompanyName: "",
//     shortDescription: "",
//     tags: "",
//     colour: "#F0D9FF",
//   }]);
//   const [startupsequity, setstartupsequity] = useState([{
//     logo: CompanyLogo3,
//     registeredCompanyName: "",
//     shortDescription: "",
//     tags: "",
//     colour: "#F0D9FF",
//   }]);
//   const [startupse, setstartups] = useState([{
//     logo: CompanyLogo3,
//     registeredCompanyName: "",
//     shortDescription: "",
//     tags: "",
//     colour: "#F0D9FF",
//   }]);

//   const fetchStartupCcps = async () => {
//     try { 
//       const response = await API.fetchStartupByType({tos:"CCPS"})
//       //  console.log("response.data.data")
//       //  console.log(response.data.data)
//        setstartupsccps(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchStartupCcds = async () => {
//     try { 
//       const response = await API.fetchStartupByType({tos:"CCDS"})
//       //  console.log("response.data.data")
//       //  console.log(response.data.data)
//        setstartupscds(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchStartupEquity = async () => {
//     try { 
//       const response = await API.fetchStartupByType({tos:"equity"})
     
//        setstartupsequity(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchStartup = async () => {
//     try { 
//       const response = await API.fetchStartupByType({tos:"startup"})
//       //  console.log("response.data.data")
//       //  console.log(response.data.data)
//        setstartups(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleInvestClick = async(id) => {
//     alert(id);
//    const data = {
//      id:id
//    }
//     navigate('/startup/startupondetails/'+id, {state: data });
//    }

//   const count = {
//     ccps : startupsccps.length,
//     ccds : startupsccds.length,
//     equity : startupsequity.length,
//     startup : startupse.length,
//   }

//   useEffect(() => {
//     fetchStartup();   
//     fetchStartupCcps();   
//     fetchStartupCcds();   
//     fetchStartupEquity();   
//   }, []);

  
//     const [callbackResult, setCallbackResult] = useState(null);
    
//     const handleCallback = async (result) => {
//       alert(result);
//       setCallbackResult(result);
//     };
console.log("Hello");
const [hovered, setHovered] = useState(false);

const handleHover = () => {
  setHovered(!hovered);
};
  return (
    <div>
    {/* <Navbar verified={"true"}/> */}
    <div className="bg-[#f7f7f7] flex justify-center items-center p-[50px]">
  <div className="flex flex-col w-[80%]">
    <div className="flex gap-8">
      <Sidebar/>
      <div className="w-[75%] flex flex-col gap-8">
      <Routes>
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/" element={<Shop/>} />
    </Routes>  
            
      </div>
    </div>
  </div>
</div>
{/* <Footer2/> */}
</div>
  );
}

export default Explorar;
