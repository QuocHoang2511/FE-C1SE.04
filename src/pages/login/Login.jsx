import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/Login.png";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../apis";
import Cookies from "js-cookie";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [hiddenPass, setHiddenPass] = useState(true);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      console.log(data);
      const result = await api.post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      console.log("result - ", result.data);
      Cookies.set("auth", JSON.stringify(result.data));
      setAuth(result.data);
    } catch (error) {
      console.log("error - ", error);
      setError("password", {
        message: "Tên đăng nhập hoặc mật khẩu không chính xác",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHiddenPassword = () => {
    hiddenPass ? setHiddenPass(false) : setHiddenPass(true);
  };

  return (
    <div className="fixed inset-0 flex items-center ">
      <div className="h-full w-auto object-cover">
        <img
          src={loginImage}
          alt="Images"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute m-auto rounded-l-[50px]  h-full right-0 w-[50%] bg-gradient-to-b from-[#ef6f1f80] to-[#FFFFFF00] px-40">
        <div className="">
          <div className=" flex justify-between py-20">
            {/* <div className="">
              <h2 className="font-semibold">
                Chào Mừng Bạn Đến <br />
                <Link to="/" className="text-2xl text-primaryColor font-bold ">ProHealth</Link>
              </h2>
            </div> */}
            {/* <div className="">
              <h2 className=" text-[#8D8D8D] ">
                Không có tài khoản? <br />
                <Link to="/signup" className="text-base text-primaryColor font-semibold ">
                  Đăng Kí
                </Link>
              </h2>
            </div> */}
          </div>
          <div className="">
            <h1 className="text-primaryColor text-center text-3xl font-semibold pb-16 drop-shadow-sm">
              Đăng Nhập
            </h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-4 ">
                <label className="font-medium text-left mb-2" htmlFor="">
                  Tên đăng nhập
                </label>
                <input
                  id="emailInput"
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  type="text"
                  autoComplete="email"
                  placeholder="youraccount@gmail.com"
                  {...register("username")}
                />
                {errors?.username?.message ? (
                  <span className="text-sm text-red-300">
                    {errors?.username.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col ">
                <label className="font-medium text-left mb-2 " htmlFor="">
                  Mật Khẩu
                </label>
                <div className="relative items-center flex">
                  <input
                    id="passwordInput"
                    className="w-full px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                    type={hiddenPass ? "password" : "text"}
                    placeholder="Mật khẩu của bạn"
                    {...register("password")}
                  />
                  {hiddenPass ? (
                    <FontAwesomeIcon
                      onClick={handleHiddenPassword}
                      className="absolute right-6"
                      icon={faEyeSlash}
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={handleHiddenPassword}
                      className="absolute right-6"
                      icon={faEye}
                    />
                  )}
                </div>{" "}
                {errors?.password?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.password.message}
                  </span>
                ) : null}
              </div>
              <div className=" text-right mt-2 mb-9 ">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primaryColor"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <button className="py-2 bg-primaryColor w-full mb-3 rounded-lg font-semibold text-white  opacity-100 active:opacity-80">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Spinner className="h-6 w-6 mr-4" />{" "}
                    <span>Đang tải...</span>
                  </div>
                ) : (
                  <span>Đăng Nhập</span>
                )}
              </button>
              <div className="">
                <h2 className=" text-[#8D8D8D] ">
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to="/signup"
                    className="text-base text-primaryColor font-medium"
                  >
                    Đăng Kí
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

export default Login;
