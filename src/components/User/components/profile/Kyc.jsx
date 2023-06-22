import React from "react";
import Tabs from "./Tabs";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import API from "../../../../apis/kyc";


const Kyc = () => {

function editdisable(){
  toast.warn("You Cannot edit KYC Contact to Admin")
}

  return (
    <>
      <div className=" md:ml-[25px] bg-white md:w-[808px] w-[100%] rounded-[20px]  ">
        <div className="md:px-[45px] px-[15px] py-[40px]">
          <div>
            <div className="flex justify-between items-center mb-[15px] md:pr-[25px] ">
              <div className="pl-[20px] ">
                <h4 className="text-[19px] font-[400] text-[#202054] leading-[28.8px]">
                  KYC
                </h4>
              </div>
              <div className="">
                <ToastContainer position="bottom-right"/>
              </div>
            </div>
            <div>
              <h4 className="text-[13.33px] text-[#828F99] font-[400] md:leading-[15.62px] leading-[20px]">
                Complete Your KYC in Minutes: Verify Your Identity and Start
                Participating in the network
              </h4>
            </div>
          </div>

          <div className="md:mt-[40px] mt-[25px]">
            <Tabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Kyc;
