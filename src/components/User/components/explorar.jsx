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
import { useSelector , useDispatch } from 'react-redux';
import Navbar from "./nav";
import Sidebar from "./sidebar";
import Shop from "./shop";
import Inventory from "./inventory";
import API from "../../../apis/product";
function Explorar() {

  const navigate = useNavigate();
  const myState = useSelector((state)=>state)
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

console.log("Hello");
const [hovered, setHovered] = useState(false);

const handleHover = () => {
  setHovered(!hovered);
};

async function getRawProducts()
{
  const formData={
    key : 'producer', 
    role:myState.authUser?.userType , 
    id:myState.authUser?.user
  }

  const res = await API.fetchRawProduct(formData);
  console.log("res");
  console.log(res);
  setShop(res.data?.success) 
}

async function getProducts()
{
  const formData={ 
    id:myState.authUser?.user,
    userType:myState.authUser?.userType , 
    role:'middlemen' , 
  }

  const res = await API.fetchShopProduct(formData);
  console.log("res");
  console.log(res);
  setShop(res.data?.success) 
}

useEffect(() => {
  if(myState.authUser?.userType=='manufacturer')
  {
    getRawProducts();
  }
  else{
    getProducts();
  }
}, []);
  return (
    <div>
    {/* <Navbar verified={"true"}/> */}
    <div className="bg-[#f7f7f7] flex justify-center items-center p-[20px]">
    {/* <div className="bg-[#f00505] flex justify-center items-center p-[40px]"> */}
  <div className="flex flex-col w-[100%]">
    <div className="flex gap-8">
      <Sidebar/>
      <div className="w-[75%] flex flex-col gap-8">
      <Routes>
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/" element={<Shop shop={shop}/>} />
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
