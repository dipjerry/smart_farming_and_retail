// import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {ToastContainer} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Login from "./components/Admin/admin";
import Signup from "./components/Admin/signup";
import Form from "./components/Admin/form";
import Home from "./components/home/home";
import React,{useEffect} from "react";




function App() {


    return (
        <div className="App">
             <Router>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  </Router>,
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div >
    );
}

export default App;
