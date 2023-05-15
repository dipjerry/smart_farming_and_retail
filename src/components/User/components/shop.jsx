import React, { useEffect, useRef, useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import FooterNavbar from "./footernav";
import { useDispatch } from 'react-redux';
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
import {
  ADD_ITEM 
} from '../../../reducer/cart';


// function Shop({shop}) {
function Shop() {
// console.log('shop',shop)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shop, setShop] = useState([
    {
    id:1,
    name: "product 1",
    description: "fsdds",
    // shortDescription: "fsdds",
    tags: "sdfsdf",
    price:10.10,
    colour: "#F0D9FF",
  },
    {
      id:2,
    name: "Product 2",
    description: "fsdds",
    tags: "sdfsdf",
    price:20.10,
    colour: "#F0D9FF",
  }
]);
console.log("Hello");
const [hovered, setHovered] = useState(null);
const [cartItems, setCartItems] = useState([]);

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



  function handleAddToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function handleIncreaseQuantity(item) {
    setCartItems(cartItems.map(i => {
      if (i.id === item.id) {
        return { ...i, quantity: i.quantity + 1 };
      } else {
        return i;
      }
    }));
  }

  function handleDecreaseQuantity(item) {
    setCartItems(cartItems.map(i => {
      if (i.id === item.id && i.quantity > 1) {
        return { ...i, quantity: i.quantity - 1 };
      } else {
        return i;
      }
    }));
  }


  return (
  
      <div className="flex flex-col w-[90%]">
        {/* <h1>Shop</h1> */}
        <div className="flex gap-8">
          {/* <Sidebar count={count} /> */}
          <div className="w-[50%] flex flex-col gap-8">
          <div className="rounded-[5px]!important md:grid md:grid-cols-3 gap-[28.5px]">
        {shop?.map((card, index) => {
          return (
            // <div className="startupcard" key={index} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHover(null)} onClick={() => dispatch(ADD_ITEM({ id: card.Key, name: card.Record.name, price: card.Record.product.price }))}>
            <div className="startupcard" key={index} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHover(null)} onClick={() => dispatch(ADD_ITEM({ id: card.id, name: card.name, price: card.price }))}>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <img src="https://picsum.photos/200" className="banner" />
                <div className="absolute bottom-5 mt-[-20px] flex justify-center items-center bg-[#fefefe] w-[60px] h-[60px] rounded-full border-[0.8px] border-solid border-[#DDDDDD]">
                  <img src="https://picsum.photos/200" className="w-full h-full rounded-full" />
                </div>
                {/* <label className="not-italic font-medium mt-3 mb-2 px-3 leading-[13px] text-[#252525] font-[Poppins]">{card.Record.name}</label> */}
              </div>
              {hovered === index && (
                <div className="card__hover-content">
                  {/* <p className="compdes">{card.Record.product.description}</p> */}
                  <p className="compdes">{card.description}</p>
                </div>
              )}
              {/* <p className="compdes">{card?.Record?.name}</p> */}
              <p className="compdes">{card?.name}</p>
              {/* <p className="compdes">₹{card?.Record?.product?.price}</p> */}
              <p className="compdes">₹{card?.price}</p>
              {/* <div className="flex items-center space-x-2">
                {typeOfcompanys.map((data, f) => (
                  <div className="flex justify-center items-center px-2 py-[1px] rounded-full bg-[#9797FE] text-[#ffffff] text-[9.26px] font-[Roboto]" key={f}>
                    <div className="w-[12px] pr-[2.75px]">
                      <img src="" alt="" className="w-full" />
                    </div>
                    <p className="leading-[9.26px]">{data.shoping1}</p>
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
        <FooterNavbar increaseQuantity={handleIncreaseQuantity} decreaseQuantity={handleDecreaseQuantity} cart={cartItems} />
      </div>
  );
}

export default Shop;
