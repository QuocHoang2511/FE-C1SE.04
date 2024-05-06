import React from "react";
import { Menusidebar } from "../../Utils/Menusidebar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../contexts/AuthContext";
import Cookies from "js-cookie";

const activeStyle =
  "hover:bg-gray-400 flex rounded-md items-center gap-4 py-3 font-bold bg-gray-200 mb-2 ";
const notActiveStyle =
  "hover:bg-gray-200 flex rounded-md items-center gap-4 py-3 mb-2";

const SidebarUsers = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  if (auth)
    return (
      <div className=" w-[400px] flex-none bg-[#F6F9F9] shadow-md">
        <div className="flex items-center gap-4 ">
          <div>
            <img
              src={auth.avatar}
              alt="avatar"
              className="w-20 h-20 object-cover rounded-full border-2 border-grey"
            />
          </div>
          <div className="flex flex-col justify-center ">
            <span className="font-bold">{auth.fullName || auth.username}</span>
            <small>{auth?.username}</small>
          </div>
        </div>
        <div className="py-12 px-[14px]">
          {Menusidebar.map((item) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.icons}
              <span>{item.text}</span>
            </NavLink>
          ))}

          <div
            onClick={() => {
              Cookies.remove("auth");
              setAuth(undefined);
              navigate("/login");
            }}
          >
            <span className={notActiveStyle}>
              <HiOutlineLogout size={23} />
              Thoát
            </span>
          </div>
        </div>
      </div>
    );
  return;
};

export default SidebarUsers;
