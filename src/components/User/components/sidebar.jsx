import React from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { BiRightArrowCircle } from "react-icons/bi";

function Sidebar(props) {
// console.log(props.count);
const navigate = useNavigate();
  const menuitem = [
    {
      path: "/user",
      name: "Home",
      noofstartup: props?.count?.ccds,
    },
    {
      path: "/user/explorar",
      name: "Shop",
      noofstartup: props?.count?.ccds,
    },
    {
      path: "/user/explorar/inventory",
      name: "inventory",
      noofstartup: props?.count?.ccps,
    },

  ];


  return (
    <div className="containize flex flex-col gap-y-7">
      <div className="sidebar-container">
        <div>
          {menuitem.map((item, index) => (
            <div
              onClick={()=>navigate(item.path)}
              key={index}
              className="link justify-between"
              activeclassname="active"
              style={{cursor: "pointer"}}
              class="flex justify-between py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded transition-colors duration-300"
            >
              <div className="link-text">{item.name}</div>
              <div className="link-text">{item.noofstartup}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
