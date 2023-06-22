import React from "react";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import userApi from "../../../../apis/users";
import API from "../../../../apis/kyc";
// import Cookies from "js-cookie";
// import API from "../../Apis/authApis";
// import investAPI from "../../Apis/investor";
// import { getUser } from "../../script/socialcheck";
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();
  const myState = useSelector((state)=>state)
  const initialvalue = {
    Name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  };
  const location = useLocation();
  const country = ["India", "NRI"];
  const states = {
    India: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
    NRI: ["NRI"],
  };
  const [selectcountry, setSelectcountry] = useState("");
  //  console.log(selectcountry)
  const [formData, setFormData] = useState(initialvalue);
  const registerMethod2 = localStorage.getItem("loginMethod2");
  const registerMethod = localStorage.getItem("loginMethod");
  console.log("registerMethod");
  console.log(registerMethod);
  const [editmode, seteditmode] = useState(false);
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  }
  async function registerComplete(e) {
    e.preventDefault();
    let newField;
    if (isformempty()) {
      toast.error("Please fill in all fields");
      return;
    }
    newField = { id:myState.authUser?.user , userType:myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType };
    const newFormData = { ...formData, ...newField };
    console.log(newFormData);
    const res = await API.signupComplete(newFormData);
    console.log(res);
    if (res.code == 200) {
      toast.success("Profile Completed");
      if (res.data.status.includes("profile")) {
        navigate("/layoutprofile");
      } else if (
        res.data.status.includes("pan") ||
        res.data.status.includes("aadhar")
      ) {
        navigate("/layoutprofile/kyc");
      } else if (res.data.status.includes("bank")) {
        navigate("/layoutprofile/bankdetail");
      } else if (res.data.status.includes("other")) {
        navigate("/layoutprofile/others");
      } else {
        navigate("/investor/dashboard");
      }
    }
  }
  function isformempty() {
    for (const field in formData) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  }
  useEffect(() => {
    async function fetchData() { 
        const res = await userApi.fetchUserbyById( {id:myState.authUser?.user});
        console.log("🚀 ~ file: Profile.jsx:134 ~ fetchData ~ res:", res)
        if(res && res.code==200){
          console.log("worked")
          if(res.data.data.pan.status!="pending")
          {
            console.log("pending state")
          }
          if(res.data.data.aadhar.status!="pending")
          {
            console.log("pending state")
        }
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <section>
        <div className=" md:ml-[25px] bg-white md:w-[808px] w-[100%] rounded-[20px]   ">
          <div className="md:px-[35px] px-[15px] py-[40px]">
            <div className="flex justify-between items-center mb-[15px] md:pr-[25px] ">
              <div className="pl-[20px] ">
                <h4 className="text-[19px] font-[400] text-[#202054] leading-[28.8px]">
                  Personal details
                </h4>
              </div>
              <div className="">
                {/* <button
                  // onClick={() => seteditmode(true)}
                  // disabled={!editmode && isformempty()}
                  onClick={() => seteditmode(false)}
                  className=" bg-[#F1F6FB] text-[#202054] md:px-6 md:py-[10px] py-[9px] px-2 rounded-[10px] hover:bg-[#f3f3fa] duration-200"
                >
                  <h4 className="md:px-[30px] px-[10px] flex justify-evenly items-center text-[16px] font-[400] text-[#202054] leading-[18.75px]">
                    Edit
                    <span className="pl-[7px]">
                      <MdEdit />
                    </span>
                  </h4>
                </button> */}
              </div>
            </div>
            <form className="w-full " onSubmit={registerComplete}>
              <div className="flex flex-wrap mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]">
                    Name
                  </label>
                  <input
                    className="appearance-none block  text-gray-700 border  border-gray-200  rounded w-full py-[10px] px-4 mb-3 leading-tight  bg-white focus:outline-none focus:border-gray-500"
                    type="text"
                    defaultValue={formData.Name}
                    placeholder="Enter your name here "
                    onChange={handleInputChange}
                    name="firstName"
                    // disabled={!editmode && formData.firstName !== ""}
                    disabled={editmode}
                  />
                  {/* {console.log(data.data.data.firstName)} */}
                </div>
              </div>
              <div className="flex flex-wrap mx-3 mb-6">
                <div className="w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]"
                    htmlFor="grid-password"
                  >
                    Email id
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-[10px] px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
                    id="grid-password"
                    type="email"
                    defaultValue={formData.email}
                    placeholder="Enter your email id here "
                    onChange={handleInputChange}
                    name="email"
                    // disabled={!!formData.email}
                    disabled={editmode}
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]"
                    htmlFor="grid-password"
                  >
                    Mobile number
                  </label>
                  <input
                    className=" inputs  appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-[10px] px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
                    id="grid-password"
                    type="number"
                    defaultValue={formData.phone}
                    placeholder="Enter your mobile Number Here "
                    onChange={handleInputChange}
                    // disabled={!editmode && formData.phone !== ""}
                    disabled={editmode}
                    name="phone"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-[10px] px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
                    id="grid-password"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    // disabled={!editmode && formData.address !== ""}
                    disabled={editmode}
                    name="address"
                    placeholder="Enter your room no area name Here  "
                  />
                </div>
              </div>
              <div className="flex flex-wrap mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]">
                    city
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border  border-gray-200  rounded py-[10px] px-4 mb-3 leading-tight  bg-white focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Enter your city Here "
                    // disabled={!formData.city}
                    defaultValue={formData.city}
                    onChange={handleInputChange}
                    // disabled={!editmode && formData.city !== ""}
                    disabled={editmode}
                    name="city"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  {selectcountry && (
                    <div>
                      <label className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]">
                        State
                      </label>
                      <select className=" appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-[10px] px-4 leading-tight focus:outline-none bg-white focus:border-gray-500">
                        {states[selectcountry].map((state) => {
                          return <option>{state}</option>;
                        })}
                      </select>
                    </div>
                  )}
                  {/* <input
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-[10px] px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Enter your state Here "
                    defaultValue={formData.state}
                    name="state"
                  /> */}
                </div>
              </div>
              <div className="flex flex-wrap mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]">
                    Pincode
                  </label>
                  <input
                    className="inputs appearance-none block w-full  text-gray-700 border  border-gray-200  rounded py-[10px] px-4 mb-3 leading-tight  bg-white focus:outline-none focus:border-gray-500"
                    type="number"
                    placeholder="Enter your pincode Here "
                    defaultValue={formData.pincode}
                    onChange={handleInputChange}
                    // disabled={!editmode && formData.pincode !== ""}
                    disabled={editmode}
                    name="pincode"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[5px]">
                    Country
                  </label>
                  <select
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-[10px] px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
                    disabled={editmode}
                    onChange={(e) => {
                      setSelectcountry(e.target.value);
                    }}
                  >
                    {country.map((countrys) => {
                      return <option>{countrys}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="w-[100%] flex md:justify-end  justify-center pr-[20px] pt-[5px]">
              <button
                    onClick={(e) => addKyc(e)}
                    className="bg-[#62f392] text-[#ffffff] md:px-4 md:py-[8px] py-[9px] px-12 rounded-[10px] hover:bg-[#44a665] duration-200"
                  >
                    <h4 className="px-[20px]"> Confirm</h4>
                  </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Profile;
