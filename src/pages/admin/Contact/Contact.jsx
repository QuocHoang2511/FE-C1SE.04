import { Table, Tag } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../apis";

import moment from "moment";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import HeaderAdmin from "../Account/HederAdmin/HeaderAdmin";

const columns = [
  {
    title: "Name Contact",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => {
      return moment(text).format("HH:MM DD/MM/YYYY");
    },
  },
];

const ContactAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  // Sample user data
  const { auth } = useAuth();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!auth) {
      navigate("/login");
    } else {
      if (auth.role !== 1) {
        navigate("/");
        toast.warn("Bạn không đủ quyền hạn", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [auth, navigate]);
  useEffect(() => {
    (async () => {
      try {
        const results = await api.get("/api/contact");
        console.log("resuls - ", results.data);
        setContacts(results.data);
      } catch (error) {
        toast.error("Xảy ra lỗi trong quá trình xử lý", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on the search term
  const filteredContacts = contacts.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (auth)
    return (
      <div className="wapper" style={{ height: "100%" }}>
        {/* <div className="header">
          <div className="left">
            <div
              style={{
                width: "150px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Hello, {auth.username}
            </div>
            <div style={{ fontSize: "14px" }}>Have a nice day</div>
          </div>
          <div className="right">
            <div className="BloodGroup-info">
              <div className="avatar">
                <div>
                  <img
                    className="avtatar-img"
                    src="./img/avata1.jpg"
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
                <h3>{auth.username}</h3>
                <h6 className="admin">admin</h6>
              </div>
              <div className="list-name"></div>
            </div>
          </div>
        </div> */}
        <HeaderAdmin />
        <div className="container">
          <div className="container_left" style={{ fontWeight: "bold" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#4A85F6",
                textTransform: "uppercase",
              }}
            >
              Management Blood Group
            </div>
            {/* Search Bar */}
            <div className="search-bar-left">
              <input
                className="search-bar-left-input"
                style={{ marginLeft: "33rem" }}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <Table
          dataSource={filteredContacts}
          columns={columns}
          scroll={{ y: 300 }}
        />
      </div>
    );
  return;
};

export default ContactAdmin;
