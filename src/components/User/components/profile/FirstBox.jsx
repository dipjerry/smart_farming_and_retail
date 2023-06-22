import React from "react";
import { NavLink } from "react-router-dom";

import { IoPersonOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { RiBankLine } from "react-icons/ri";
// import "../../assets/css/styles.css";

const FirstBox = () => {
  return (
    <>
      <section>
        <div className="border-[2px] p-2 w-[302px] h-[330px] bg-white rounded-[20px]">
          <ul className="pt-[25px]">
            <NavLink
              to="/user/profile/*"
              className="link"
              activeclassname="active"
            >
              <li className="flex cursor-pointer justify-start  text-[#000000] items-center py-[15px] ">
                <span className="px-[30px]">
                  <IoPersonOutline size={30} />
                </span>
                <h4 className="pl-[10px] text-[18px] font-[400]  leading-[21.09px]">
                  Profile
                </h4>
              </li>
            </NavLink>
            <NavLink
              to="kyc"
              className="link"
              activeclassname="active"
            >
              <li className="flex cursor-pointer justify-start text-[#000000] items-center py-[15px]   ">
                <span className="px-[30px]">
                  <SlPeople size={30} />
                </span>
                <h4 className="pl-[10px] text-[18px] font-[400] leading-[21.09px]">
                  KYC
                </h4>
              </li>
            </NavLink>
            <NavLink
              to="bankdetail"
              className="link"
              activeclassname="active"
            >
              <li className="flex cursor-pointer justify-start text-[#000000] items-center active:py-[15px] py-[15px] ">
                <span className="px-[30px]">
                  <RiBankLine size={30} />
                </span>
                <h4 className="pl-[10px] text-[18px] font-[400] leading-[21.09px]">
                  {" "}
                  Bank details
                </h4>
              </li>
            </NavLink>
            {/* <NavLink
              to="/layoutprofile/others"
              className="link"
              activeclassname="active"
            >
              <li className="flex cursor-pointer justify-start items-center text-[#000000] py-[15px] ">
                <span className="px-[30px]">
                  <TbDotsCircleHorizontal size={30} />
                </span>
                <h4 className="pl-[10px] text-[18px] font-[400] leading-[21.09px]">
                  Other
                </h4>
              </li>
            </NavLink> */}
          </ul>
        </div>
      </section>
    </>
  );
};

export default FirstBox;
