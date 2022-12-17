// import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {ToastContainer} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/home";
import React,{useEffect} from "react";




function App() {


    return (
        <div className="App">
            <Router>
                <Home />
            </Router>
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
