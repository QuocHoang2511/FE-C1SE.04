import { Table, Tag } from "antd";
import "./bloodGroup.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../apis";

import moment from "moment";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import HeaderAdmin from "../Account/HederAdmin/HeaderAdmin";

const columns = [
  {
    title: "FullName",
    dataIndex: "fullName",
    key: "fullname",
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
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Blood",
    dataIndex: "blood",
    key: "blood",
    render: (text) => {
      return (
        <Tag color="red">
          {text === 1
            ? "A"
            : text === 2
            ? "B"
            : text === 3
            ? "O"
            : text === 4
            ? "AB"
            : ""}
        </Tag>
      );
    },
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

const BloodGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bloods, setBloods] = useState([]);
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
        const results = await api.get("/api/form");
        console.log("resuls - ", results.data);
        setBloods(results.data);
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
  const filteredUsers = bloods.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
  };
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
          dataSource={filteredUsers}
          columns={columns}
          scroll={{ y: 300 }}
        />
        {/* <div className="List">
        <div className="listUsers">
            <h2>List Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Majors</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.majors}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="edit">Edit</button>
                                <button className="delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div> */}
      </div>
    );
  return;
};

export default BloodGroup;
