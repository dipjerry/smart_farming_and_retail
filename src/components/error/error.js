import { RightCircleOutlined } from "@ant-design/icons";
import React from "react";
import Cta8 from "../../assets/plugins/images/cta/cta8.png";
import Cta9 from "../../assets/plugins/images/cta/cta9.png";
import Errorimg from "../../assets/plugins/images/error.png";
// import Navbar from "../Components/Navbar1/Navbar1";
// import Footer from "../Components/Footer/Footer";
// import Footer2 from "../Components/Footer2/Footer2";
// import { Helmet } from "react-helmet";

function Error() {
  return (
    <div>
      {/* <Navbar verified={"true"}/> */}
      {/* <Helmet>
        <title>Page Not Found | Error 404 | Bizdateup</title>
        <meta name="description"  content="Oops! The page you are looking for is not found. Please check the URL or navigate back to the homepage of Bizdateup." />
      </Helmet> */}
      <div className="flex justify-center items-center py-16 bg-[#f7f7f7] p-8">
        <div className="flex gap-x-8 w-full lg:w-[75%] ">
          <div className="box-border flex justify-center w-full lg:w-[75%] border rounded-[10px] border-solid border-[#DDDDDD] bg-[#ffffff] p-6 ">
            <div className="flex flex-col justify-center items-center ">
              <div className=" flex justify-center items-center w-[288px] h-[240px] bg-[#7EA9DC] rounded-[190px]">
                <img src={Errorimg} />
              </div>
              <div className="mt-6">
                <label className="not-italic font-medium text-[25px] leading-[45px] text-[#252525] font-[Poppins] lg:text-3xl ">
                  404-PAGE NOT FOUND
                </label>
              </div>
              <div className="">
                <p className="hidden md:flex md:not-italic md:font-light md:text-base md:leading-6 md:text-[#828F99] md:font-[Poppins]">
                  The graphic and typographic operators know this well, in
                  reality
                </p>
              </div>
              <button className="w-[173px] h-[42px] rounded-[10px] bg-[#202054] text-[#ffffff] not-italic font-normal text-base leading-[19px] font-[Roboto] mt-4">
                Go to Homepage
              </button>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col lg:w-[22%]">
           
          </div>
        </div>
      </div>
      {/* <Footer2 /> */}
    </div>
  );
}

export default Error;
