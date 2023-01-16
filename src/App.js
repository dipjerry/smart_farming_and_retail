// import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';
import {ToastContainer} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Login from "./components/Admin/admin_auth";
import Signup from "./components/Admin/signup";
import Form from "./components/Admin/form";
import Preview from "./components/supply_chain/batchprogress";
import Home from "./components/home/home";
import React,{useEffect} from "react";




function App() {


    return (
        <div className="App">
             <Router>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin_auth" element={<Login />} />
      <Route path="/admin_auth" element={<admindashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/form" element={<Form />} />
      <Route path="/preview" element={<Preview />} />
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
