import React from "react";
import FirstBox from "./FirstBox";
import Inverted from "./InverterContainer";

const LayoutProfile = () => {
  return (
    <>
      <div className="w-[100%] bg-[#f2f2f2]   md:p-0 p-[20px] font-[Roboto] ">
        <div className="pb-[60px]">
          <div className="flex justify-center ">
            <div className="md:block hidden">
              <div className=" text-[#202054] ">
                <h4 className="md:text-[30px] text-[24px] font-[400]  py-[25px]">
                  Kyc Verification
                </h4>
              </div>
              <FirstBox />
            </div>
            <div className="md:pt-[95px]">
              <Inverted />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default LayoutProfile;
