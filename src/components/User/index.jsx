import React from "react";
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Home from "./user_dashboard";
import Statistics from "./components/statistics";


function App() {
    return (
        // <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>   
//   </div >
    );
}

export default App;
