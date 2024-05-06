import { toast } from "react-toastify";
import { api } from "../../../apis";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Modal, Table } from "antd";
import moment from "moment";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YouTube from "react-youtube";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router";
import HeaderAdmin from "../Account/HederAdmin/HeaderAdmin";

const Diet = () => {
  const { auth } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [diets, setDiets] = useState([]);
  const [diet, setDiet] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredEvents = diets.filter((user) =>
    user.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
  const columns = useMemo(
    () => [
      {
        title: "Diet title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 250,
      },
      {
        title: "Thumbnail",
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: (text) => (
          <img
            src={text}
            className="w-[150px] h-[100px] rounded-md object-cover"
          />
        ),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => moment(text).format("HH:MM DD/MM/YYYY"),
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // Sample user data
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const results = await api.get("/api/diet");
      console.log("result - ", results.data);
      setDiets(results.data);
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
      const result = await api.get(`/api/diet/${_id}`);
      console.log("result - ", result.data);
      setDiet(result.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const result = await api.delete(`/api/diet/${_id}`);
      fetchData();
      toast.success("Xóa bài tập thành công", {
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
    setDiet(undefined);
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
              ALL Diet
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
                className="container_bottom_NewEvent !w-[150px]"
                style={{
                  fontSize: "14px",
                  backgroundColor: "#4A85F6",
                  fontWeight: "600",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                ADD Diet +
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
            resetInitialValue={() => setDiet(undefined)}
            initialValue={diet}
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
    title: yup.string().required(),
    description: yup.string().required(),
    thumbnail: yup.string().required(),
    content: yup.string().required(),
  })
  .required();

const TableContent = ({
  closeModal,
  updateData,
  initialValue,
  resetInitialValue,
}) => {
  const modules = React.useMemo(
    () => ({
      toolbar: [
        ["italic", "bold", "underline"],
        ["link", "image"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
      ],
    }),
    []
  );
  const [categories, setCtegories] = useState([]);
  console.log("initial value - ", initialValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("errors - ", errors);
  const thumbnail_watch = watch("thumbnail");
  const content_watch = watch("content");
  useEffect(() => {
    if (initialValue) {
      initialValue?.title && setValue("title", initialValue.title);
      initialValue?.description &&
        setValue("description", initialValue.description);
      initialValue?.thumbnail && setValue("thumbnail", initialValue.thumbnail);
      initialValue?.content && setValue("content", initialValue.content);
    } else {
      reset();
    }
  }, [initialValue, reset, setValue]);
  useEffect(() => {
    (async () => {
      try {
        const results = await api.get("/api/category");
        console.log("result - ", results.data);
        setCtegories(results.data);
      } catch (error) {
        console.log("error - ", error);
      }
    })();
  }, []);
  const onSubmit = async (data) => {
    try {
      if (!initialValue) {
        const result = await api.post("/api/diet", data);
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
        const result = await api.put(`/api/diet/${initialValue._id}`, data);
        resetInitialValue();
        toast.success("Chỉnh sửa bài tập thành công", {
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
        {initialValue ? "Edit Diet" : "Add Diet"}
      </h2>
      <div className="w-full grid grid-cols-2 gap-5">
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Chế độ ăn
          </label>
          <input
            id="emailInput"
            className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            type="text"
            placeholder="Tên sự kiện"
            {...register("title")}
          />
          {errors?.title?.message ? (
            <span className="text-sm text-red-300">
              {errors?.title.message}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col col-span-1">
          <label className="font-medium text-left mb-2" htmlFor="">
            Hình ảnh
          </label>
          <input
            id="emailInput"
            className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
            type="text"
            autoComplete="Địa chỉ"
            placeholder="Địa chỉ"
            {...register("thumbnail")}
          />
          {errors?.thumbnail?.message ? (
            <span className="text-sm text-red-300">
              {errors.thumbnail.message}
            </span>
          ) : null}
          {thumbnail_watch && (
            <img
              src={thumbnail_watch}
              className="w-full h-[200px] object-cover rounded-md mt-3"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col col-span-1">
        <label className="font-medium text-left mb-2" htmlFor="">
          Mô tả
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
      <div className="flex flex-col col-span-1">
        <label className="font-medium text-left mb-2" htmlFor="">
          Nội dung
        </label>
        <ReactQuill
          placeholder="Nội dung......"
          modules={modules}
          theme="snow"
          value={content_watch}
          onChange={(value) => setValue("content", value)}
        />
        {errors?.content?.message ? (
          <span className="text-sm text-red-300">{errors.content.message}</span>
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
        {initialValue ? "Edit Diet" : "Add Diet"}
      </button>
    </form>
  );
};

export default Diet;
