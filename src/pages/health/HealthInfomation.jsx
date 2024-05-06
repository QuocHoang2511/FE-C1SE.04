import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../apis";
import moment from "moment";
function HealthInfomation() {
  const { userId } = useParams();
  const [health, setHealth] = useState();
  console.log("healr - ", health);
  useEffect(() => {
    (async () => {
      const result = await api.get("/api/health");
      console.log("result - ", result.data);
      const listHealths = result.data.filter(
        (item) => item.user._id === userId
      );
      console.log("list Health - ", listHealths);
      if (listHealths.length > 0) {
        setHealth(listHealths[listHealths.length - 1]);
      }
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
  }, [userId]);
  if (health)
    return (
      <div className="w-full lg:w-3/4 mx-auto my-10">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-semibold text-xl mb-5">Thông tin sức khỏe</h1>
          <img
            src={health.user.avatar}
            alt=""
            className="w-40 h-40 rounded-full bg-blue-gray-600"
          />
          <p className="font-medium text-lg mt-5">{health.user.fullName}</p>
          <p>Birthday: {moment(health.user.birth).format("DD/MM/YYYY")}</p>
          <p>Email: {health.user.email}</p>
          <p>Phone: {health.user.phone}</p>
          <p>Address: {health.user.address}</p>
          <p>Weight: {health.weight} Kg</p>
          <p>Height: {health.height} Cm</p>
          <p>Heart Rate: {health.heartRate} Cm</p>
          <p>Blood Pressure: {health.bloodPressure} Cm</p>
          <Link to={'/qr-code'}
            type="button"
            className="px-4 py-2 rounded-lg bg-blue-400 text-white mt-5"
          >
            Cập nhật thông tin
          </Link>
        </div>
      </div>
    );
  return;
}

export default HealthInfomation;
