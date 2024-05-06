import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    birth: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

const Editprofile = () => {
  const { auth, setAuth } = useAuth();
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  console.log("avatar - ", avatar);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (auth) {
      setValue("username", auth.username);
      auth?.email && setValue("email", auth.email);
      auth?.address && setValue("address", auth.address);
      auth?.birth && setValue("birth", auth.birth);
      auth?.phone && setValue("phone", auth.phone);
    }
  }, [auth, setValue]);
  console.log(errors);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("data - ", data);
      if (avatar) {
        const bodyFormData = new FormData();
        bodyFormData.append("image", avatar);
        const response = await axios({
          method: "post",
          url: "https://api.imgbb.com/1/upload?key=363edc6873f02c1fad13fd4d87e9af9d",
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response.data.data.url - ", response.data.data.url);
        const result = await api.put(`/api/user/${auth._id}`, {
          ...data,
          avatar: response.data.data.url,
        });
        console.log("result - ", result.data);
        setAuth(result.data);
        Cookies.remove("auth");
        Cookies.set("auth", JSON.stringify(result.data));
        toast.success("Cập nhật thông tin thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const result = await api.put(`/api/user/${auth._id}`, data);
        console.log("result - ", result.data);
        setAuth(result.data);
        Cookies.remove("auth");
        Cookies.set("auth", JSON.stringify(result.data));
        toast.success("Cập nhật thông tin thành công", {
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
    } catch (error) {
      console.log("error - ", error);
      toast.error("Xảy ra lỗi trong quá trình xử lý", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setError("username", { message: "Tên đăng nhập đã tồn tại" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center">
      <h1 className="text-3x1 w-full text-start text-primaryColor font-medium py-4 border-b-[1px] border-gray-300">
        Chỉnh Sửa Thông Tin Cá Nhân
      </h1>
      <form
        className="w-4/5 flex items-center justify-center flex-auto mt-[-80px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="pb-6 flex flex-col gap-4 w-full">
          <div className={"flex-row flex"}>
            <label className="w-48 flex-none" htmlFor="title">
              Ảnh đại diện
            </label>
            <div className="flex flex-auto flex-col items-center">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                id="avatar"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  console.log("file", e.target.files);
                }}
              />
            </div>
          </div>
          <div className={"flex-row flex"}>
            <label className="w-48 flex-none" htmlFor="title">
              Tên Hiển Thị
            </label>
            <div className="flex flex-auto flex-col items-center">
              <div className="flex w-full items-center">
                <input
                  type="text"
                  id="title"
                  className={`outline-none border flex-auto border-gray-300 p-2 rounded-md`}
                  {...register("username")}
                />
              </div>
              {errors?.username?.message ? (
                <small className="text-red-500 block w-full">
                  {errors.username.message}
                </small>
              ) : null}
            </div>
          </div>
          <div className={"flex-row flex"}>
            <label className="w-48 flex-none" htmlFor="email">
              Email
            </label>
            <div className="flex flex-auto flex-col items-center">
              <div className="flex w-full items-center">
                <input
                  type="email"
                  id="Email"
                  className={`outline-none border flex-auto border-gray-300 p-2 rounded-md`}
                  {...register("email")}
                />
              </div>
              {errors?.email?.message ? (
                <small className="text-red-500 block w-full">
                  {errors.email.message}
                </small>
              ) : null}
            </div>
          </div>
          <div className={"flex-row flex"}>
            <label className="w-48 flex-none" htmlFor="email">
              Số Điện Thoại
            </label>
            <div className="flex flex-auto flex-col items-center">
              <div className="flex w-full items-center">
                <input
                  type="text"
                  id="email"
                  className={`outline-none border flex-auto border-gray-300 p-2 rounded-md`}
                  {...register("phone")}
                />
              </div>
              {errors?.phone?.message ? (
                <small className="text-red-500 block w-full">
                  {errors.phone.message}
                </small>
              ) : null}
            </div>
          </div>

          <div className={"flex-row flex"}>
            <label className="w-48 flex-none" htmlFor="birthday">
              Ngày Sinh
            </label>
            <div className="flex flex-auto flex-col items-center">
              <div className="flex w-full items-center">
                <input
                  type="date"
                  id="birthday"
                  className={`outline-none border flex-auto border-gray-300 p-2 rounded-md`}
                  {...register("birth")}
                />
              </div>
              {errors?.birth?.message ? (
                <small className="text-red-500 block w-full">
                  {errors.birth.message}
                </small>
              ) : null}
            </div>
          </div>
          <div className={"flex-row flex"}>
            <label className="w-48 flex-none" htmlFor="address">
              Địa Chỉ
            </label>
            <div className="flex flex-auto flex-col items-center">
              <div className="flex w-full items-center">
                <input
                  type="address"
                  id="email"
                  className={`outline-none border flex-auto border-gray-300 p-2 rounded-md`}
                  {...register("address")}
                />
              </div>
              {errors?.address?.message ? (
                <small className="text-red-500 block w-full">
                  {errors.address.message}
                </small>
              ) : null}
            </div>
          </div>
          {/* <div className='flex mb-6'>

                    <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                    <div>
                        <img src={payload.avatar || mAvata} alt="avatar" className='w-28 h-28 rounded-full object-cover' />
                        <input type="file" className="appearance-none my-4" id="avatar" />
                        

                    </div>
                </div> */}
          <button
            type={"submit"}
            className={`py-2 bg-blue-600 h-[40px] text-white outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 rounded-full border-white border-r-transparent animate-spin" />
            ) : (
              <span>Cập Nhật</span>
            )}
          </button>
          {/* <Button
            type="submit"
            className="text-no-underline"
            text=""
            bgColor=""
            textColor="text-white"
          /> */}
        </div>
      </form>
    </div>
  );
};

export default Editprofile;
