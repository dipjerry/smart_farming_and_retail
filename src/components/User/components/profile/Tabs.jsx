import { useState, useEffect } from "react";
import API from "../../../../apis/kyc";
import userApi from "../../../../apis/users";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector , useDispatch } from 'react-redux';
function Tabs() {
  const navigate = useNavigate();
  const myState = useSelector((state)=>state)
  const [toggleState, setToggleState] = useState(1);
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const refId = sessionStorage.getItem('authRefInvestor');
  useEffect(() => {
    async function fetchData() { 
        const res = await userApi.fetchUserbyById( {id:myState.authUser?.user});
        console.log("res")
        console.log(res)
        if(res && res.code==200){
          console.log("worked")
          setFirstName(res.data.data.firstName)
          setLastName(res.data.data.lastName)
          if(res.data.data.pan.status!="pending")
          {
            console.log("pending state")
            setPan(res.data.data.pan.panNo);
          }
          if(res.data.data.aadhar.status!="pending")
          {
            console.log("pending state")
          setAadhar(res.data.data.aadhar.aadharNo);
        }
      }
    }
    fetchData();
  }, []);
  const addKyc = async (e) => {
    e.preventDefault();
    // const userData = JSON.parse(sessionStorage.getItem('auth'));
    if (toggleState == 2) {
      const formData = {
        panNo:pan, 
        userType:myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType , 
        id:myState.authUser?.user
      }  
      console.log(formData);
      const res = await API.pan(formData);
      if (res.code == 200) {
        toast.success("Pan Card Verified");
        if(res.data.status.includes("profile")){
          navigate("/layoutprofile");
        }
        else{
          navigate("/investor/dashboard");
        }
      }
      // toast.error("Error in verifying");
      return;
    }
    // else{
    const formData = {
      aadhar,
      userType:myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType ,
    id:myState.authUser?.user
    };
    const res = await API.aadhar(formData);
    if (res.code == 200) {
      toast.success("Aadhar card verified");
      if(res.data.status.includes("pan")){
        setToggleState(2);
      }
      else{
        navigate("/investor/dashboard");
      }
    }
  };
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const handlePanInputChange = (event) => {
    const panValue = event.target.value;
    setPan(panValue);
    console.log(panValue);
  };
  const handleAadharInputChange = (event) => {
    const aadharValue = event.target.value;
    setAadhar(aadharValue);
    console.log(aadharValue);
  };
  return (
    <>
      <section>
        <div className="w-[100%]">
          <div className="flex flex-col relative break-all  ">
            <div className="flex justify-start items-center md:w-[60%] w-[100%] h-[70px] md:pb-[15px] ">
              <div className="w-[100px] flex justify-start items-center ">
                <button
                  className={
                    toggleState === 1
                      ? "  border-[#202052] border-b-[4px] duration-600 w-[100%] py-[10px] text-[#202054] font-[400] leading-[18.75px]  "
                      : " w-[100%] py-[10px] text-[#828F99] font-[400] leading-[18.75px]"
                  }
                  onClick={() => toggleTab(1)}
                >
                  Aadhar card
                </button>
              </div>
              <div className="w-[100px] flex justify-center items-center">
                <button
                  className={
                    toggleState === 2
                      ? "  border-[#202052] border-b-[4px] duration-600 w-[100%] py-[10px]  text-[#202054] font-[400] leading-[18.75px] "
                      : " w-[100%] py-[10px]  text-[#828F99] font-[400] leading-[18.75px]"
                  }
                  onClick={() => toggleTab(2)}
                >
                  PAN CARD
                </button>
              </div>
              </div>
            <div className="w-[100%] md:pt-[50px] pt-[45px]">
              <form action="">
                <div
                  className={toggleState === 1 ? " duration-600  " : "hidden"}
                >
                  <div className="flex flex-wrap  mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[9px]"
                        htmlFor="grid-password"
                      >
                        Aadhar card number
                      </label>
                      <input
                        className="inputs appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-[7px] px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
                        id="grid-password"
                        type="number"
                        placeholder="Enter your Aadhar card number here "
                        defaultValue={aadhar}
                        onChange={(event) => handleAadharInputChange(event)}
                      />
                    </div>
                  </div>
                  </div>
                  <div
                    className={toggleState === 2 ? " duration-600" : "hidden"}
                  >
                    <div className="flex flex-wrap mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-[#828F99] font-[400] leading-[11.72px] text-[10px] mb-[9px]"
                          htmlFor="grid-password"
                        >
                          PAN Card number
                        </label>
                        <input
                          className="inputs appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-[7px] px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
                          id="grid-password"
                          defaultValue={pan}
                          placeholder="Enter your PAN Card number Here  "
                          onChange={(event) => handlePanInputChange(event)}
                        />
                      </div>
                    </div>
                  </div>
                <div className="flex justify-center md:justify-end items-center pr-[8px] mt-[50px]">
                  <button
                    onClick={(e) => addKyc(e)}
                    className="bg-[#62f392] text-[#ffffff] md:px-4 md:py-[8px] py-[9px] px-12 rounded-[10px] hover:bg-[#44a665] duration-200"
                  >
                    <h4 className="px-[20px]"> Confirm</h4>
                  </button>
                </div>
                {/* <ToastContainer position="bottom-right" /> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Tabs;
