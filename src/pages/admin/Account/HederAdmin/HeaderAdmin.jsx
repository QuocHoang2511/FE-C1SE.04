import { avatar } from "@material-tailwind/react";
import { useAuth } from "../../../../contexts/AuthContext";
import "./headerAdmin.css";
import React from "react";
import { useNavigate } from "react-router";
const HeaderAdmin = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="left">
        <div
          style={{
            width: "150px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Hello, {auth.fullName}
        </div>
        <div style={{ fontSize: "14px" }}>Have a nice day</div>
      </div>
      <div className="right">
        <div className="account-info" onClick={() => navigate("/profile")}>
          <div className="avatar">
            <div>
              <img
                className="avtatar-img bg-blue-gray-500"
                src={auth.avatar}
                alt=""
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
          </div>
          <div className="account-name">
            <h3>{auth.fullName}</h3>
            <h6 className="admin">admin</h6>
          </div>
          <div className="list-name"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
