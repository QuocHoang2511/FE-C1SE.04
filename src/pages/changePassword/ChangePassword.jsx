import React, { useEffect, useState } from "react";
import SidebarUsers from "../../components/sidebarUsers/SidebarUsers";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";
import Cookies from "js-cookie";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const schema = yup
  .object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    reNewPassword: yup.string().required(),
  })
  .required();

const ChangePassword = () => {
  const [hiddenOldPassword, setHiddenOldPassword] = useState(true);
  const [hiddenNewPassword, setHiddenNewPassword] = useState(true);
  const [hiddenReNewPassword, setHiddenReNewPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) navigate("/login");
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (auth.password === data.oldPassword) {
      if (data.reNewPassword === data.newPassword) {
        setLoading(true);
        try {
          console.log(data);
          const result = await api.put(`/api/user/${auth._id}`, {
            password: data.newPassword,
          });
          console.log("result - ", result.data);
          setAuth(result.data);
          Cookies.remove("auth");
          Cookies.set("auth", JSON.stringify(result.data));
          toast.success("Thay đổi mật khẩu thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
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
          setLoading(false);
        }
      } else {
        setError("reNewPassword", { message: "Mật khẩu xác nhận không khớp" });
      }
    } else {
      setError("oldPassword", { message: "Mật khẩu không chính xác" });
    }
  };

  const notify = (message, type) => {
    const toastType = type === "success" ? toast.success : toast.error;
    return toastType(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className=" pt-10 px-36 w-full h-screen flex flex-col">
      <div className="flex w-full flex-auto">
        <SidebarUsers />
        <div className="flex-auto p-4">
          <h1 className="text-3x1 text-primaryColor text-lg font-medium py-4 border-b border-gray-200">
            Thay Đổi Mật Khẩu
          </h1>
          <div className="w-full gap-4 py-14 pl-20 ">
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-4 mr-20 w-[80%]">
                  <div className="mb-3 ">
                    <label htmlFor="" className="block  mb-2">
                      Mật Khẩu Cũ
                    </label>
                    <div className="relative ">
                      <input
                        id="input-oldPassword"
                        className="w-full px-4 py-2 border-2 rounded-md  outline-none focus:border-primaryColor placeholder:text-md text-md"
                        type={hiddenOldPassword ? "password" : "text"}
                        placeholder="Mật Khẩu Cũ"
                        {...register("oldPassword")}
                      />
                      {hiddenOldPassword ? (
                        <FontAwesomeIcon
                          onClick={() =>
                            setHiddenOldPassword(!hiddenOldPassword)
                          }
                          className="absolute top-4 right-6 hover:cursor-pointer"
                          icon={faEyeSlash}
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={() =>
                            setHiddenOldPassword(!hiddenOldPassword)
                          }
                          className="absolute top-4 right-6 hover:cursor-pointer"
                          icon={faEye}
                        />
                      )}
                    </div>
                    {errors?.oldPassword?.message ? (
                      <span className="text-sm text-red-300">
                        {errors.oldPassword.message}
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="block  mb-2">
                      Mật Khẩu Mới
                    </label>
                    <div className="relative">
                      <input
                        id="input-newPassword"
                        className="w-full px-4 py-2 border-2 rounded-md outline-none focus:border-primaryColor placeholder:text-md text-md"
                        type={hiddenNewPassword ? "password" : "text"}
                        placeholder="Mật Khẩu Mới"
                        {...register("newPassword")}
                      />
                      {hiddenNewPassword ? (
                        <FontAwesomeIcon
                          onClick={() =>
                            setHiddenNewPassword(!hiddenNewPassword)
                          }
                          className="absolute top-4 right-6 hover:cursor-pointer"
                          icon={faEyeSlash}
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={() =>
                            setHiddenNewPassword(!hiddenNewPassword)
                          }
                          className="absolute top-4 right-6 hover:cursor-pointer"
                          icon={faEye}
                        />
                      )}
                    </div>
                    {errors?.newPassword?.message ? (
                      <span className="text-sm text-red-300">
                        {errors.newPassword.message}
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="block mb-2">
                      Nhập Lại Mật Khẩu Mới
                    </label>
                    <div className="relative">
                      <input
                        id="input-reNewPassword"
                        className="w-full px-4 py-2 border-2  rounded-md outline-none focus:border-primaryColor placeholder:text-md text-md"
                        type={hiddenReNewPassword ? "password" : "text"}
                        placeholder="Nhập Lại Mật Khẩu Mới"
                        {...register("reNewPassword")}
                      />
                      {hiddenReNewPassword ? (
                        <FontAwesomeIcon
                          onClick={() =>
                            setHiddenReNewPassword(!hiddenReNewPassword)
                          }
                          className="absolute top-4 right-6 hover:cursor-pointer"
                          icon={faEyeSlash}
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={() =>
                            setHiddenReNewPassword(!hiddenReNewPassword)
                          }
                          className="absolute top-4 right-6 hover:cursor-pointer"
                          icon={faEye}
                        />
                      )}
                    </div>
                    {errors?.reNewPassword?.message ? (
                      <span className="text-sm text-red-300">
                        {errors.reNewPassword.message}
                      </span>
                    ) : null}
                  </div>
                  <div></div>
                  <div className=" hover:opacity-80">
                    <button
                      className="border px-8 py-2 rounded-md bg-primaryColor text-white absolute "
                      type="submit"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Spinner className="h-6 w-6 mr-4" />{" "}
                          <span>Đang lưu...</span>
                        </div>
                      ) : (
                        <span>Lưu</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
