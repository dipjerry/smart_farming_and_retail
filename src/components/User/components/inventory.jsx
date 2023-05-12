import React, { useEffect, useRef, useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
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


function Inventory() {

  const navigate = useNavigate();
  const [shop, setShop] = useState([
    {
    // logo: CompanyLogo3,
    _id:1,
    registeredCompanyName: "boo",
    shortDescription: "fsdds",
    quantity: 10,
    tags: "sdfsdf",
    colour: "#F0D9FF",
  },
  {
    _id:2,
    // logo: CompanyLogo3,
    registeredCompanyName: "boo",
    shortDescription: "fsdds",
    quantity: 10,
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
const [hovered, setHovered] = useState(null);

const handleHover = (id) => {
  setHovered(id);
};
const typeOfcompanys = [
    {
      shoping1: "E-Commerce",
    },
    {
      shoping1: "E-Commerce",
    },
  ];
  return (
  
      <div className="flex flex-col w-[80%]">
        {/* <h2>Inventory</h2> */}
        <div className="flex gap-8">
          {/* <Sidebar count={count} /> */}
          <div className="w-[75%] flex flex-col gap-8">
          <div className="rounded-[5px]!important md:grid md:grid-cols-3 gap-[28.5px]">
        {shop?.map((card, index) => {
          return (
            <div
              className="startupcard "
              key={index}
              onMouseEnter={()=>handleHover(index)}
              onMouseLeave={()=>handleHover(null)}
              onClick={()=>{handleCallback(card._id)}}
            >
              <div className=" flex flex-col gap-3">
                <div>
                  <img src={"https://picsum.photos/200"}  className="banner" />
                  <div className="flex px-3 ">
                    {/* <div className="mt-[-20px] flex justify-center bg-[#fefefe] w-[60px] h-[60px] box-border rounded-[7.93145px] border-[0.793145px] border-solid border-[#DDDDDD]">
                    <img src={"https://picsum.photos/200"} />
                    </div> */}
                    <label className="not-italic font-medium m-2 leading-[13px] text-[#252525] font-[Poppins]">
                      {card.title}
                    </label>
                  </div>
                </div>
                {hovered===index && (
                  <div className="card__hover-content">
                    <div>
                <p className="compdes">{card.shortDescription}</p>
                </div>
                  </div>
                )}
                <p className="compdes">{card.text}</p>
                <div className="flex justify-between">
                  <div>
                    <label className="not-italic font-normal text-[16px] leading-4 tracking-[0.971402px] text-[#252525] font-[Roboto]">
                      {card.rise}
                    </label>
                    <p className="not-italic font-normal text-[12.5726px] leading-4 tracking-[0.971402px] text-[#828F99] font-[Roboto]">
                      Quantity - {card.quantity}
                    </p>
                  </div>
                  {/* <div>
                    <label className="not-italic font-normal text-[16px] leading-4 tracking-[0.971402px] text-[#252525] font-[Roboto]">
                      {card.subscription}
                    </label>
                    <p className="not-italic font-normal text-[10.5726px] leading-4 tracking-[0.971402px] text-[#828F99] font-[Roboto]">
                      Min Invest
                    </p>
                  </div> */}
                </div>
                {/* <div className="flex justify-start items-center ">
                  {typeOfcompanys.map((data, f) => (
                    <div
                      className="flex justify-center items-center pb-[1px] border-[0.5px] rounded-[7499.3px] bg-[#9797FE]  w-[83px] mr-[12px] h-[16px] border-[#828F99]"
                      key={f}
                    >
                      <div className="w-[12px] pr-[2.75px]">
                        <img src="" alt="" className="w-[100%]" />
                      </div>
                      <p className="font-[400] leading-[9.26px] font-[Roboto] text-[#ffffff] text-[9.26px] ">
                        {data.shoping1}
                      </p>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
           </div>
        </div>
      </div>
  );
}

export default Inventory;
