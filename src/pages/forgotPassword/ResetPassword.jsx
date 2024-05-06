import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image4 from "../../assets/images/Image3.png";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";
import { useNavigate, useParams } from "react-router-dom";
import loginImage from "../../assets/images/Login.png";
const schema = yup
  .object({
    newPassword: yup.string().required(),
    reNewPassword: yup.string().required(),
  })
  .required();

function ResetPassword() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(true);
  const [hiddenRePass, setHiddenRePass] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (data.newPassword === data.reNewPassword) {
      setLoading(true);
      try {
        const result = await api.put(`/api/user/${userId}`, {
          password: data.newPassword,
        });
        console.log("result - ", result.data);
        navigate("/login");
        toast.success("Thay đổi mật khẩu thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
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
      } finally {
        setLoading(false);
      }
    } else {
      setError("reNewPassword", "Xác nhận mật khẩu không khớp");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="h-screen flex items-center bg-gradient-to-b from-yellow-900 via-transparent to-transparent ">
        <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[70%] lg:grid lg:grid-cols-10 shadow-xl m-auto my-auto rounded pb-4 lg:pb-0">
          <div className="hidden lg:block h-full w-full col-span-6">
            <img
              className="h-[600px] w-[600px] object-cover "
              src={loginImage}
              alt="Images"
            />
          </div>
          <div className="text-center lg:col-span-4">
            <div className="w-[80%] m-auto">
              <h1 className="text-primaryColor text-3xl font-bold py-10">
                Đặt Lại Mật Khẩu
              </h1>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-6">
                  <label
                    className="font-medium text-left text-lg mb-2 "
                    htmlFor=""
                  >
                    Mật Khẩu Mới
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                      type={hiddenPass ? "password" : "text"}
                      placeholder="Mật khẩu mới của bạn"
                      {...register("newPassword")}
                    />
                    {hiddenPass ? (
                      <FontAwesomeIcon
                        onClick={() => setHiddenPass(false)}
                        className="absolute top-5 right-6"
                        icon={faEyeSlash}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => setHiddenPass(true)}
                        className="absolute top-5 right-6"
                        icon={faEye}
                      />
                    )}
                  </div>
                  {errors?.newPassword?.message ? (
                    <span className="text-sm text-red-300">
                      {errors?.newPassword.message}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col ">
                  <label
                    className="font-medium text-left text-lg mb-2 "
                    htmlFor=""
                  >
                    Xác Nhận Mật Khẩu
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                      type={hiddenRePass ? "password" : "text"}
                      placeholder="Nhập lại mật khẩu của bạn"
                      {...register("reNewPassword")}
                    />
                    {hiddenRePass ? (
                      <FontAwesomeIcon
                        onClick={() => setHiddenRePass(false)}
                        className="absolute top-5 right-6"
                        icon={faEyeSlash}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => setHiddenRePass(true)}
                        className="absolute top-5 right-6"
                        icon={faEye}
                      />
                    )}
                  </div>
                  {errors?.reNewPassword?.message ? (
                    <span className="text-sm text-red-300">
                      {errors?.reNewPassword.message}
                    </span>
                  ) : null}
                </div>
                <button className="py-3 bg-primaryColor w-full mt-8 mb-12 rounded-lg text-xl font-bold text-white  opacity-100 active:opacity-80">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner className="h-6 w-6 mr-4" />{" "}
                      <span>Đang tải....</span>
                    </div>
                  ) : (
                    <span>Đặt lại</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
