import React from "react";
import { Routes, Route } from "react-router";
import Profile from "./Profile";
import Kyc from "./Kyc";
import BankDetail from "./BankDetail";
// import Others from "./Others";

const InverterContainer = () => {
  return (
    <>
      <section>
        <div className="border-[2px] md:ml-[25px] bg-white w-[100%] rounded-[20px]  ">
          <Routes>
            <Route path="/*" element={<Profile />} />
            <Route path="/kyc" element={<Kyc />} />
            <Route path="/bankdetail" element={<BankDetail />} />
            {/* <Route path="/others" element={<Others />} /> */}
          </Routes>
        </div>
      </section>
    </>
  );
};

export default InverterContainer;
