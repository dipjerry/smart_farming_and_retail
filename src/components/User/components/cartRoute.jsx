const express=require("express");
const cart_route=express();
const bodyparser=require("body-parser");
cart_route.use(bodyparser.json());
cart_route.use(bodyparser.urlencoded({extended:true}));

const auth=require("../user/user_auth");
const cart_controller=require('./cartController');

cart_route.post('/add-to-cart',auth,cart_controller.add_to_cart)
module.exports=cart_route;