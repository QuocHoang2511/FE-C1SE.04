import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/Login.png";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";

import Cookies from "js-cookie";
import { useAuth } from "../../contexts/AuthContext";

const schema = yup
  .object({
    username: yup.string().required(),
    fullName: yup.string().required(),
    password: yup.string().required(),
    repassword: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
    birth: yup.string().required(),
  })
  .required();

function SignUp() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(true);
  const [reHiddenPass, setReHiddenPass] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (auth) {
      if (auth.role === 0) {
        navigate("/");
      } else if (auth.role === 1) {
        navigate("/admin/dashboard");
      }
    }
  }, [auth, navigate]);
  const onSubmit = async (data) => {
    if (data.repassword === data.password) {
      setLoading(true);
      try {
        console.log(data);
        const result = await api.post("/api/user", {
          username: data.username,
          fullName: data.fullName,
          phone: data.phone,
          password: data.password,
          email: data.email,
          address: data.address,
          birth: data.birth,
        });
        console.log("result - ", result.data);
        Cookies.set("auth", JSON.stringify(result.data));
        setAuth(result.data);
      } catch (error) {
        console.log("error - ", error);
        setError("username", { message: "Tên đăng nhập đã tồn tại" });
      } finally {
        setLoading(false);
      }
    } else {
      setError("repassword", { message: "Mật khẩu xác nhận không khớp" });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center ">
      <div className="h-full w-auto object-cover">
        <img src={loginImage} alt="Images" className="h-full w-full" />
      </div>
      <div className="absolute m-auto rounded-l-[50px]  h-full right-0 w-[50%] bg-gradient-to-b from-[#99c5fd80] to-[#FFFFFF00] px-40">
        <div className="">
          <div className=" flex justify-between py-6">
            {/* <div className="">
              <h2 className="font-semibold">
                Chào Mừng Bạn Đến <br />
                <Link to="/" className="text-2xl text-primaryColor font-bold ">
                  ProHealth
                </Link>
              </h2>
            </div> */}
            {/* <div className="">
              <h2 className=" text-[#8D8D8D] ">
                Bạn đã có tài khoản? <br />
                <Link
                  to="/login"
                  className="text-base text-primaryColor font-semibold "
                >
                  Đăng Nhập
                </Link>
              </h2>
            </div> */}
          </div>
          <div className="">
            <h1 className="text-primaryColor text-center text-3xl font-bold pt-6 pb-10  pdrop-shadow-sm">
              Đăng Kí
            </h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex flex-col ">
                  <label className="font-medium text-left mb-2" htmlFor="">
                    Tên đăng nhập
                  </label>
                  <input
                    className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor bg-white"
                    type="text"
                    placeholder="Họ của bạn"
                    {...register("username")}
                  />
                  {errors?.username?.message ? (
                    <span className="text-sm text-red-300">
                      {errors.username.message}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col ">
                  <label className="font-medium text-left mb-2" htmlFor="">
                    Họ và tên
                  </label>
                  <input
                    className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor bg-white"
                    type="text"
                    placeholder="Tên của bạn"
                    {...register("fullName")}
                  />
                  {errors?.fullName?.message ? (
                    <span className="text-sm text-red-300">
                      {errors.fullName.message}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                {" "}
                <div className="flex flex-col mb-2">
                  <label className="font-medium text-left mb-2" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <input
                    className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor bg-white"
                    type="tel"
                    placeholder="Nhập số điện thoại của bạn"
                    {...register("phone")}
                  />
                  {errors?.phone?.message ? (
                    <span className="text-sm text-red-300">
                      {errors.phone.message}
                    </span>
                  ) : null}
                </div>{" "}
                <div className="flex flex-col mb-2">
                  <label className="font-medium text-left mb-2" htmlFor="phone">
                    Email
                  </label>
                  <input
                    className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor bg-white"
                    type="email"
                    placeholder="youremail@gmail.com"
                    {...register("email")}
                  />
                  {errors?.email?.message ? (
                    <span className="text-sm text-red-300">
                      {errors.email.message}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                {" "}
                <div className="flex flex-col mb-2">
                  <label className="font-medium text-left mb-2" htmlFor="phone">
                    Địa chỉ
                  </label>
                  <input
                    className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor bg-white"
                    type="text"
                    placeholder="Địa chỉ"
                    {...register("address")}
                  />
                  {errors?.address?.message ? (
                    <span className="text-sm text-red-300">
                      {errors.address.message}
                    </span>
                  ) : null}
                </div>{" "}
                <div className="flex flex-col mb-2">
                  <label className="font-medium text-left mb-2" htmlFor="phone">
                    Ngày sinh
                  </label>
                  <input
                    className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor bg-white"
                    type="date"
                    {...register("birth")}
                  />
                  {errors?.birth?.message ? (
                    <span className="text-sm text-red-300">
                      {errors.birth.message}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* <div className="flex flex-col mb-2">
                <label
                  className="font-medium text-left mb-1"
                  htmlFor=""
                >
                  Địa Chỉ Email
                </label>
                <input
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  type="email"
                  placeholder="youraccount@gmail.com"
                  onChange={(e) => setEmail(replaceEmail(e.target.value))}
                  value={email}
                  required
                />
              </div> */}
              <div className="flex flex-col mb-2">
                <label className="font-medium text-left mb-1" htmlFor="">
                  Mật Khẩu
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                    type={hiddenPass ? "password" : "text"}
                    placeholder="Mật khẩu của bạn"
                    {...register("password")}
                  />
                  {hiddenPass ? (
                    <FontAwesomeIcon
                      onClick={() => setHiddenPass(!hiddenPass)}
                      className="absolute top-4 right-6"
                      icon={faEyeSlash}
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={() => setHiddenPass(!hiddenPass)}
                      className="absolute top-4 right-6"
                      icon={faEye}
                    />
                  )}
                  {errors?.password?.message ? (
                    <span className="text-sm text-red-300">
                      {errors.password.message}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="font-medium text-left mb-1" htmlFor="">
                  Xác Nhận Mật Khẩu
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                    type={reHiddenPass ? "password" : "text"}
                    placeholder="Nhập lại mật khẩu của bạn"
                    {...register("repassword")}
                  />
                  {reHiddenPass ? (
                    <FontAwesomeIcon
                      onClick={() => setReHiddenPass(!reHiddenPass)}
                      className="absolute top-4 right-6"
                      icon={faEyeSlash}
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={() => setReHiddenPass(!reHiddenPass)}
                      className="absolute top-4 right-6"
                      icon={faEye}
                    />
                  )}
                  {errors?.repassword?.message ? (
                    <span className="text-sm text-red-300">
                      {errors?.repassword.message}
                    </span>
                  ) : null}
                </div>
              </div>
              <button className="py-2 bg-primaryColor w-full mb-3 rounded-lg font-bold text-white opacity-100 active:opacity-80">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Spinner className="h-6 w-6 mr-4" />{" "}
                    <span>Đang tải....</span>
                  </div>
                ) : (
                  <span>Đăng Kí</span>
                )}
              </button>
              <div className="text-base">
                <h2 className=" text-[#8D8D8D] ">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="text-base text-primaryColor font-medium"
                  >
                    Đăng Nhập
                  </Link>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
