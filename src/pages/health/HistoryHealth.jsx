import React, { useEffect, useState } from "react";
import SidebarUsers from "../../components/sidebarUsers/SidebarUsers";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { api } from "../../apis";
import { toast } from "react-toastify";
import { Table } from "antd";
import moment from "moment";

const columns = [
    {
      title: "Weight (kg)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Height (cm)",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Blood Pressure",
      dataIndex: "bloodPressure",
      key: "bloodPressure",
    },
    {
      title: "Heart Rate",
      dataIndex: "heartRate",
      key: "heartRate",
    },
    {
      title: "Updated At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return moment(text).format("HH:MM DD/MM/YYYY");
      },
    },
  ];
function HistoryHealth() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [healths, setHealths] = useState();
  useEffect(() => {
    if (!auth) navigate("/login");
  });
  console.log("healr - ", healths);
  useEffect(() => {
    if (auth) {
      (async () => {
        const result = await api.get("/api/health");
        console.log("result - ", result.data);
        const listHealths = result.data.filter(
          (item) => item.user._id === auth._id
        );
        console.log("list Health - ", listHealths);
        setHealths(listHealths);
        try {
        } catch (error) {
          console.log(error);
          toast.error("Xảy ra lỗi trong quá trình xư lý", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })();
    }
  }, [auth]);
  return (
    <div className=" pt-10 px-36 w-full h-screen flex flex-col overflow-y-scroll">
      <div className="flex w-full flex-auto">
        <SidebarUsers />
        <div className="flex-auto p-4">
          <h1 className="text-3x1 text-primaryColor text-lg font-medium py-4 border-b border-gray-200">
            Lịch sử sức khỏe
          </h1>
          <Table
          dataSource={healths}
          columns={columns}
          scroll={{ y: 300 }}
        />
        </div>
      </div>
    </div>
  );
}

export default HistoryHealth;
