import React from "react";
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Home from "./user_dashboard";
import Statistics from "./components/statistics";
import Explorar from "./components/explorar";
import Navbar2 from "./components/nav";
import Cart from "./components/cart";


function App() {
    return (
        <>
<Navbar2/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explorar/*" element={<Explorar />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </>   
//   </div >
    );
}

export default App;
