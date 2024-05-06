import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import domtoimage from "dom-to-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { api } from "../../apis";
import { useNavigate } from "react-router";

const schema = yup
  .object({
    fullName: yup.string().required(),
    // studentID: yup.string().required(),
    email: yup.string().required(),
    birth: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    gender: yup.string().required(),
    height: yup.string().required(),
    weight: yup.string().required(),
    blood: yup.string().required(),
    // underlyDisease: yup.string().required(),
    bloodPressure: yup.string().required(),
    heartRate: yup.string().required(),
  })
  .required();

function QR_Code() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [qrData, setQrData] = useState(""); // State để lưu dữ liệu QR code
  useEffect(() => {
    if (!auth) navigate("/login");
  });
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
      auth?.fullName && setValue("fullName", auth.fullName);
      auth?.email && setValue("email", auth.email);
      auth?.birth && setValue("birth", auth.birth);
      auth?.phone && setValue("phone", auth.phone);
      auth?.address && setValue("address", auth.address);
    }
  }, [auth, setValue]);
  const onSubmit = async (data) => {
    try {
      console.log("data - ", data);
      const {
        // fullName,
        // email,
        // birth,
        // phone,
        // address,
        // gender,
        // blood,
        height,
        weight,
        heartRate,
        bloodPressure,
        // underlyDisease,
      } = data;

      const result = await api.post(`/api/health`, {
        user: auth._id,
        weight,
        height,
        heartRate,
        bloodPressure,
      });
      console.log("result - ", result.data);

      setQrData(`http://localhost:3000/health/${auth._id}`);
      toast.success("Cập nhật thông tin sức khỏe thành công", {
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

    // Tạo dữ liệu từ các trường nhập và định dạng thành một chuỗi
    // const dataQR = `\nHọ Và Tên: ${fullName}
    //               \nMã Số Sinh Viên: ${studentID}
    //               \nEmail: ${email}
    //               \nNgày Sinh: ${birth}
    //               \nGiới Tính: ${gender}
    //               \nChiều Cao: ${height}
    //               \nCân Nặng: ${weight}
    //               \nNhóm Máu: ${blood}
    //               \nPhone: ${phone}
    //               \nĐịa Chỉ: ${address}
    //               \nTiền Sử Bệnh: ${underlyDisease}
    //               `;

    // Cập nhật state qrData với dữ liệu mới
    // setQrData(dataQR);
  };

  const saveQRCodeAsImage = () => {
    const node = document.getElementById("your-qrcode"); // Thay 'your-qrcode' bằng id thực của phần tử chứa mã QR code
    domtoimage
      .toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qrcode.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error saving QR code as image:", error);
      });
  };
  return (
    <div className="max-w-[1200px] mx-auto bg-white border-gray-200 mt-20 px-4 lg:px-10 py-5">
      <div className="flex ">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">
            QR Code Lưu Thông Tin Cá Nhân
          </h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="flex flex-col ">
                <label className="font-medium text-left mb-1 " htmlFor="">
                  Họ và Tên
                </label>
                <input
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  type="text"
                  placeholder="Họ và tên của bạn"
                  {...register("fullName")}
                />
                {errors?.fullName?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.fullName.message}
                  </span>
                ) : null}
              </div>
              <div className="grid-cols-1">
                <label className="font-medium text-left mb-1 block" htmlFor="">
                  Địa Chỉ Email
                </label>
                <input
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor w-full"
                  type="email"
                  placeholder="youraccount@gmail.com"
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
              <div className="flex flex-col">
                <label className="font-medium text-left mb-1" htmlFor="date">
                  Ngày Sinh
                </label>
                <input
                  type="date"
                  className=" w-full h-full px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  placeholder="Ngày sinh của bạn"
                  {...register("birth")}
                />
                {errors?.birth?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.birth.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-left mb-1" htmlFor="">
                  Giới Tính
                </label>
                <select
                  className=" w-full px-4 h-[43px] py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  {...register("gender")}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
                {errors?.gender?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.gender.message}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="flex flex-col ">
                <label className="font-medium text-left mb-1 " htmlFor="">
                  Chiều Cao
                </label>
                <input
                  className="w-full h-full px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  type="number"
                  placeholder="Chiều cao của bạn"
                  {...register("height")}
                />
                {errors?.height?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.height.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col ">
                <label className="font-medium text-left mb-1 " htmlFor="">
                  Cân Nặng
                </label>
                <input
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  type="number"
                  placeholder="Cân nặng của bạn"
                  {...register("weight")}
                />
                {errors?.weight?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.weight.message}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="flex flex-col">
                <label className="font-medium text-left mb-1" htmlFor="">
                  Nhóm Máu
                </label>
                <select
                  className="w-full h-full px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  {...register("blood")}
                >
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="o">O</option>
                  <option value="ab">AB</option>
                </select>
                {errors?.blood?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.blood.message}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col ">
                <label className="font-medium text-left mb-1 " htmlFor="">
                  Số Điện Thoại
                </label>
                <input
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  type="tel"
                  placeholder="Nhập số điện thoại của bạn"
                  {...register("phone")}
                />
                {errors?.phone?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.phone.message}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col h-full  mb-2">
              <label className="font-medium text-left mb-1" htmlFor="">
                Địa Chỉ Thường Trú
              </label>
              <input
                className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                type="address"
                placeholder="Địa chỉ của bạn"
                {...register("address")}
              />
              {errors?.address?.message ? (
                <span className="text-sm text-red-300">
                  {errors.address.message}
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="flex flex-col ">
                <label className="font-medium text-left mb-1 " htmlFor="">
                  Huyết áp
                </label>
                <input
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor"
                  type="number"
                  // placeholder="Họ và tên của bạn"
                  {...register("bloodPressure")}
                />
                {errors?.bloodPressure?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.bloodPressure.message}
                  </span>
                ) : null}
              </div>
              <div className="grid-cols-1">
                <label className="font-medium text-left mb-1 block" htmlFor="">
                  Nhịp tim
                </label>
                <input
                  className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor w-full"
                  type="number"
                  // placeholder="youraccount@gmail.com"
                  {...register("heartRate")}
                />
                {errors?.heartRate?.message ? (
                  <span className="text-sm text-red-300">
                    {errors.heartRate.message}
                  </span>
                ) : null}
              </div>
            </div>
            {/* <div className="flex flex-col h-full  mb-2">
              <label className="font-medium text-left text-lg mb-1" htmlFor="">
                Tiền Sử Bệnh Nền
              </label>
              <textarea
                className="px-4 py-2 border border-[#afafaf] rounded-lg outline-none focus:border-primaryColor h-[100px]"
                placeholder="Tiền sử bệnh nền của bạn"
                {...register("underlyDisease")}
              ></textarea>
              {errors?.underlyDisease?.message ? (
                <span className="text-sm text-red-300">
                  {errors.underlyDisease.message}
                </span>
              ) : null}
            </div> */}
            <button className="mt-5 py-2 bg-primaryColor w-full mb-3 rounded-lg text-xl font-bold text-white opacity-100 active:opacity-80">
              <span>Tạo Mã QR Code</span>
            </button>
          </form>
        </div>
        <div className="w-1/2 p-32 pt-0">
          <div id="your-qrcode">
            <QRCode className="mt-24" size={300} value={qrData} />
          </div>
          <button onClick={saveQRCodeAsImage} className=" text-lg mt-10 px-12">
            <FontAwesomeIcon icon={faDownload} className="px-2" />
            Download QR Code
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default QR_Code;
