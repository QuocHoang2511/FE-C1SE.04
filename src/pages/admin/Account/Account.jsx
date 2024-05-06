import React, { useEffect, useLayoutEffect, useState } from "react";
import "./account.css";
import { api } from "../../../apis";

import { Table, Tag } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import HeaderAdmin from "./HederAdmin/HeaderAdmin";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "FullName",
    dataIndex: "fullName",
    key: "fullname",
  },
  //   {
  //     title: "Username",
  //     dataIndex: "email",
  //     key: "username",
  //   },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (text) => {
      if (text) {
        if (text === 1) {
          return <Tag color="blue">Nam</Tag>;
        }
        if (text === 0) {
          return <Tag color="pink">Nữ</Tag>;
        }
      }
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (text) => {
      if (text === 1) {
        return <Tag color="red">Admin</Tag>;
      }
      if (text === 0) {
        return <Tag color="black">Student</Tag>;
      }
    },
  },
];

const Account = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample user data
  const [users, setUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on the search term
  const filteredUsers =
    users.length > 0
      ? users.filter((user) =>
          user?.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
  };
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
        const result = await api.get("/api/user");
        console.log("result - ", result.data);
        setUsers(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if (auth)
    return (
      <div className="wapper" style={{ height: "100%" }}>
        <HeaderAdmin />
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
            <div className="account-info">
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
        <div className="container">
          <div
            className="container_left !mr-0 w-full"
            style={{ fontWeight: "bold" }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#4A85F6",
                textTransform: "uppercase",
              }}
            >
              Management Account
            </div>
            {/* Search Bar */}
            <div className="search-bar-left ml-auto">
              <input
                className="search-bar-left-input !border !border-black"
                //   style={{ marginLeft: "38.4rem" }}
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
        {/* <div className="List !mt-5">
        <div className="listUsers">
          <h2>List Users</h2>
          <table className="text-base">
            <thead>
              <tr>
                <th>Name</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Address</th>
                <th>phone</th>
                <th>gender</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 &&
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{user?.email}</td>
                    <td>{user?.address}</td>
                    <td>{user.phone}</td>
                    <td>
                      {(user?.gender === 0 && "male") ||
                        (user?.gender === 1 && "female")}
                    </td>
                    <td>
                      {(user?.role === 0 && "student") ||
                        (user?.role === 1 && "admin")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer"></div> */}
      </div>
    );
  return;
};

export default Account;
