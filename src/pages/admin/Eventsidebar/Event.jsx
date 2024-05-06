import { toast } from "react-toastify";
import { api } from "../../../apis";
import "./event.css";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Modal, Table } from "antd";
import moment from "moment";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router";
import HeaderAdmin from "../Account/HederAdmin/HeaderAdmin";

const Event = () => {
  const { auth } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const filteredEvents = events.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = useMemo(
    () => [
      {
        title: "Event name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 250,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
      },
      {
        title: "End Time",
        dataIndex: "endTime",
        key: "endTime",
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => moment(text).format("HH:MM DD/MM/YYYY"),
      },
      {
        title: "Action",
        dataIndex: "_id",
        key: "_id",
        render: (text) => (
          <div>
            <button className="edit" onClick={() => handleEdit(text)}>
              Edit
            </button>
            <button
              className="delete"
              onClick={() => {
                handleDelete(text);
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );
  // Sample user data
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const results = await api.get("/api/event");
      console.log("result - ", results.data);
      setEvents(results.data);
    } catch (error) {
      console.log("error - ", error);
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
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = async (_id) => {
    try {
      const result = await api.get(`/api/event/${_id}`);
      console.log("result - ", result.data);
      setEvent(result.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const result = await api.delete(`/api/event/${_id}`);
      fetchData();
      toast.success("Xóa event thành công", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Xảy ra lỗi trong quá trình xử lý", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("cdjsbvkjdsbkj");
    setEvent(undefined);
    setIsModalOpen(false);
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
        <HeaderAdmin />
        <div className="container-event !flex">
          <div className="container_left" style={{ fontWeight: "bold" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#4A85F6",
                textTransform: "uppercase",
              }}
            >
              ALL EVENT
            </div>
          </div>

          <div className="container_bottom">
            <div className="search-bar-left">
              <input
                className="search-bar-left-input"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="button_new_Event">
              <button
                className="container_bottom_NewEvent"
                style={{
                  fontSize: "14px",
                  backgroundColor: "#4A85F6",
                  fontWeight: "600",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                ADD Event +
              </button>
            </div>
          </div>
        </div>
        <Table
          className="mt-5"
          dataSource={filteredEvents}
          columns={columns}
          scroll={{ y: 300 }}
        />
        <Modal
          width={800}
          //   title="Add Event"
          open={isModalOpen}
          //   onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <TableContent
            resetInitialValue={() => setEvent(undefined)}
            initialValue={event}
            closeModal={() => setIsModalOpen(false)}
            updateData={() => fetchData()}
          />
        </Modal>
      </div>
    );
  return;
};

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    endDate: yup.string().required(),
    startDate: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),
  })
  .required();

const TableContent = ({
  closeModal,
  updateData,
  initialValue,
  resetInitialValue,
}) => {
  console.log("initial value - ", initialValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (initialValue) {
      initialValue?.name && setValue("name", initialValue.name);
      initialValue?.description &&
        setValue("description", initialValue.description);
      initialValue?.startDate && setValue("startDate", initialValue.startDate);
      initialValue?.startTime && setValue("startTime", initialValue.startTime);
      initialValue?.endDate && setValue("endDate", initialValue.endDate);
      initialValue?.endTime && setValue("endTime", initialValue.endTime);
      initialValue?.address && setValue("address", initialValue.address);
    } else {
      reset();
    }
  }, [initialValue, reset, setValue]);
  const onSubmit = async (data) => {
    try {
      if (!initialValue) {
        const result = await api.post("/api/event", data);
        toast.success("Thêm thành công", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const result = await api.put(`/api/event/${initialValue._id}`, data);
        resetInitialValue();
        toast.success("Chỉnh sửa event thành công", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      reset();
      updateData();
      closeModal();
      console.log("data - ", data);
    } catch (error) {
      console.log("error - ", error);
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
    } finally {
    }
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-semibold text-lg">
        {initialValue ? "Edit Event" : "Add Event"}
      </h2>
      <div className="w-full grid grid-cols-2 gap-5">
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Tên sự kiện
          </label>
          <input
            id="emailInput"
            className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            type="text"
            placeholder="Tên sự kiện"
            {...register("name")}
          />
          {errors?.name?.message ? (
            <span className="text-sm text-red-300">{errors?.name.message}</span>
          ) : null}
        </div>
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Địa chỉ
          </label>
          <input
            id="emailInput"
            className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            type="text"
            autoComplete="Địa chỉ"
            placeholder="Địa chỉ"
            {...register("address")}
          />
          {errors?.address?.message ? (
            <span className="text-sm text-red-300">
              {errors.address.message}
            </span>
          ) : null}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-5">
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Thời gian bắt đầu
          </label>
          <input
            type="time"
            id="dateOfBirth"
            className="px-4 py-1 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            {...register("startTime")}
          />
          {errors?.startTime?.message ? (
            <span className="text-sm text-red-300">
              {errors?.startTime.message}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            id="dateOfBirth"
            className="px-4 py-1 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            {...register("startDate")}
          />
          {errors?.startDate?.message ? (
            <span className="text-sm text-red-300">
              {errors?.startDate.message}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Thời gian kết thúc
          </label>
          <input
            type="time"
            id="dateOfBirth"
            className="px-4 py-1 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            {...register("endTime")}
          />
          {errors?.endTime?.message ? (
            <span className="text-sm text-red-300">
              {errors?.endTime.message}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Ngày kết thúc
          </label>
          <input
            type="date"
            id="dateOfBirth"
            className="px-4 py-1 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            {...register("endDate")}
          />
          {errors?.endDate?.message ? (
            <span className="text-sm text-red-300">
              {errors?.endDate.message}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col col-span-1">
        <label className="font-medium text-left mb-2" htmlFor="">
          Mô tả event
        </label>
        <textarea
          id="dateOfBirth"
          className="px-4 py-1 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
          {...register("description")}
        />
        {errors?.description?.message ? (
          <span className="text-sm text-red-300">
            {errors?.description.message}
          </span>
        ) : null}
      </div>
      <button
        type="submit"
        className="container_bottom_NewEvent text-white"
        style={{
          fontSize: "14px",
          backgroundColor: "#4A85F6",
          fontWeight: "600",
        }}
      >
        {initialValue ? "Edit Event" : "Add Event"}
      </button>
    </form>
  );
};

export default Event;
