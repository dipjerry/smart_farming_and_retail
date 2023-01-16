// import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';
import {ToastContainer} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import AdminLogin from "./components/Admin/admin_auth";
import UserLogin from "./components/User/user_auth";
import Signup from "./components/Admin/signup";
import Form from "./components/Admin/form";
import Preview from "./components/supply_chain/batchprogress";
import AdminDashboard from "./components/Admin/admin_dashboard";
import UserDashboard from "./components/User/user_dashboard";
import Home from "./components/home/home";
import React,{useEffect} from "react";




function App() {


    return (
        <div className="App">
             <Router>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin_auth" element={<AdminLogin />} />
      <Route path="/user_auth" element={<UserLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/form" element={<Form />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/admin_dashboard" element={<AdminDashboard />} />
      <Route path="/user_dashboard" element={<UserDashboard />} />
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
