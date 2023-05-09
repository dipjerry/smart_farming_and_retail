// import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import AdminLogin from "./components/Admin/admin_auth";
import UserLogin from "./components/User/user_auth";
import Signup from "./components/Admin/signup";
import Form from "./components/Admin/form";
import Preview from "./components/supply_chain/batchprogress";
import Admin from "./components/Admin/index";
import User from "./components/User/index";
import Shop from "./components/User/components/shop";
import Home from "./components/home/home";
import Classify from "./components/ML/service/Classify";
import React,{useEffect} from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store , {persistor}  from './helper/store';

function App() {
    console.log("store.subscribe(()=>console.log(store.getState()));")
    console.log("store");
    console.log(store);
    // store.subscribe(()=>console.log(store.getState()));
    return (
        <div className="App">
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin_auth" element={<AdminLogin />} />
      <Route path="/user_auth" element={<UserLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/form" element={<Form />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/user/*" element={<User/>} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/classify" element={<Classify/>} />
    </Routes>
  
  </Router>
  </PersistGate>
  </Provider>
           
        </div >
    );
}

export default App;
