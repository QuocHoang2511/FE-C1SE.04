import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
const schema = yup
  .object({
    fullName: yup.string().required(),
    phone: yup.string().required(),
    age: yup.string().required(),
    blood: yup.string().required(),
    event: yup.string().required(),
    email: yup.string().required(),
  })
  .required();
function BloodDonation() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) navigate("/login");
  });
  const [showInfo, setShowInfo] = useState(false);
  const [event, setEvent] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: auth?.fullName ? auth.fullName : "",
      phone: auth?.phone,
    },
    mode: "onChange",
  });
  console.log("error - ", errors);

  useEffect(() => {
    if (auth) {
      auth?.fullName && setValue("fullName", auth.fullName);
      auth?.phone && setValue("phone", auth.phone);
      auth?.birth && setValue("age", auth.birth);
      auth?.email && setValue("email", auth.email);
    }
  }, [auth, setValue]);

  useEffect(() => {
    (async () => {
      try {
        const results = await api.get("/api/event");
        console.log("result - ", results.data);
        setEvent(results.data);
      } catch (error) {
        console.log("error - ", error);
        setError("event", { message: "Xảy ra lỗi trong quá trình xử lý" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("data - ", data);
      const age = new Date().getFullYear() - new Date(data.age).getFullYear();
      console.log("age - ", age);
      const results = await api.post("/api/form", {
        ...data,
        age: age,
        user: auth._id,
      });
      console.log("result - ", results.data);
      toast("Đăng ký hiến máu thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      console.log("error - ", error);
      toast.error("Xảy ra lỗi trong quá trình xử ly", {
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
  const handleInfoButtonClick = () => {
    setShowInfo(!showInfo);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-[1100px] mx-auto bg-white border-gray-200 mt-20 px-4 lg:px-10 py-5">
        <div className="flex justify-center  w- grid grid-cols-1 gap-2 box-content h-[30%] w-[80%] p-4 border-4 border-black m-5 rounded-lg">
          <h1 className="text-3xl flex justify-center font-bold">
            Thông tin sinh viên
          </h1>
          <div class="grid gap-4 grid-cols-3">
            <div>
              <label htmlFor="fullName">Họ và tên:</label>
              <input
                type="text"
                id="fullName"
                placeholder="Nguyễn Văn A"
                className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                {...register("fullName")}
              />
              {errors?.fullName?.message ? (
                <span className="text-sm text-red-300">
                  {errors.fullName.message}
                </span>
              ) : null}
            </div>
            {/* <div>
              <label htmlFor="studentId">Mã số sinh viên:</label>
              <input
                type="text"
                id="studentId"
                required
                placeholder="26211125412"
                className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                value={studentId}
                onChange={(event) => setStudentId(event.target.value)}
              />
            </div> */}
            <div>
              <label htmlFor="dateOfBirth">Ngày tháng năm sinh:</label>
              <input
                type="date"
                id="dateOfBirth"
                className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                {...register("age")}
              />
              {errors?.age?.message ? (
                <span className="text-sm text-red-300 block">
                  {errors.age.message}
                </span>
              ) : null}
            </div>
            <div>
              <label htmlFor="phoneNumber">Số điện thoại:</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="03521234567"
                className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                {...register("phone")}
              />
              {errors?.phone?.message ? (
                <span className="text-sm text-red-300">
                  {errors.phone.message}
                </span>
              ) : null}
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="youremail@gmail.com"
                className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                {...register("email")}
              />
              {errors?.email?.message ? (
                <span className="text-sm text-red-300">
                  {errors.email.message}
                </span>
              ) : null}
            </div>
            {/* <div>
              <label htmlFor="address">Địa chỉ thường trú:</label>
              <input
                type="text"
                id="address"
                required
                placeholder="245 Nguyễn Văn Linh..."
                className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div> */}
            {/* <div>
              <label htmlFor="gender" className="block">
                Giới tính:
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
              >
                <option value="">Chọn giới tính</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
            </div> */}
          </div>
        </div>
        <div className="flex justify-center  w- grid grid-cols-1 gap-2 box-content h-[30%] w-[80%] p-4 border-4 border-black m-5 rounded-lg">
          <h1 className="text-3xl flex justify-center font-bold">
            PHIẾU ĐĂNG KÝ HIẾN MÁU NHÂN ĐẠO
          </h1>
          <div>
            <label htmlFor="bloodgroup">Nhóm máu: </label>
            <select
              id="bloodgroup"
              {...register("blood")}
              className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
            >
              <option value="">Chọn nhóm máu</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">O</option>
              <option value="4">AB</option>
              {/* <option value="No">Không biết</option> */}
            </select>
          </div>{" "}
          {errors?.blood?.message ? (
            <span className="text-sm text-red-300">{errors.blood.message}</span>
          ) : null}
          {/* <div className="">
            <label htmlFor="vaccineStatus">
              Bạn đã tiêm vaccine Covid chưa?{" "}
            </label>
            <div className="grid grid-cols-2 gap-4 place-content-around">
              <label>
                <input
                  type="radio"
                  name="vaccineStatus"
                  value="Đã tiêm vaccine"
                  checked={vaccineStatus === "Đã tiêm vaccine"}
                  onChange={(event) => setVaccineStatus(event.target.value)}
                />
                Đã tiêm vaccine
              </label>
              <label>
                <input
                  type="radio"
                  name="vaccineStatus"
                  value="Chưa tiêm vaccine"
                  checked={vaccineStatus === "Chưa tiêm vaccine"}
                  onChange={(event) => setVaccineStatus(event.target.value)}
                />
                Chưa tiêm vaccine
              </label>
            </div>
          </div> */}
          <select
            id="blooddonationday"
            {...register("event")}
            className="px-4 py-1 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
          >
            <option value="">Vui lòng chọn ngày hiến máu : </option>
            {event.map((item) => (
              <option value={item._id}>
                {item.startTime} {item.startDate} - {item.endTime}{" "}
                {item.endDate}
              </option>
            ))}
          </select>
          {errors?.event?.message ? (
            <span className="text-sm text-red-300">{errors.event.message}</span>
          ) : null}
          <div>
            <button
              onClick={handleInfoButtonClick}
              className="bg-red-100 px-4 py-1 border-2 border-[#afafaf] w-[100%] h-[35px] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg "
            >
              {showInfo ? "Lưu ý quan trọng " : "Lưu ý quan trọng "}
            </button>
            {showInfo && (
              <div>
                <b className="text-2xl">
                  {" "}
                  *** CHỤP LẠI MÀN HÌNH ĐĂNG KÝ THÀNH CÔNG ĐỂ CÓ MÃ QR
                </b>

                <p className="grid grid-cols-1 gap-0 place-content-start ">
                  <strong>1. Ai có thể tham gia hiến máu?</strong>
                  <span>
                    - Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến
                    máu của mình để cứu chữa người bệnh.
                  </span>
                  <span>
                    - Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng
                    máu hiến mỗi lần không quá 9ml/kg cân nặng và không quá
                    500ml mỗi lần.
                  </span>
                  <span>
                    - Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và
                    các bệnh lây nhiễm qua đường truyền máu khác.
                  </span>
                  <span>
                    - Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và
                    Nữ.
                  </span>
                  <span>- Có giấy tờ tùy thân. </span>
                </p>
                <p className="grid grid-cols-1 gap-0 place-content-start ">
                  <strong>2. Ai là người không nên hiến máu? </strong>
                  <span>
                    - Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm
                    HIV.
                  </span>
                  <span>
                    - Người đã nhiễm viêm gan B, viêm gan C, và các vius lây qua
                    đường truyền máu.
                  </span>
                  <span>
                    - Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ
                    dày…
                  </span>
                </p>
                <p className="grid grid-cols-1 gap-0 place-content-start ">
                  <strong>
                    3. Máu của tôi sẽ được làm những xét nghiệm gì?
                  </strong>
                  <span>
                    - Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu
                    (hệ ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C,
                    giang mai, sốt rét.
                  </span>
                  <span>
                    - Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn
                    (miễn phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.
                  </span>
                </p>
                <p className="grid grid-cols-1 gap-0 place-content-start ">
                  <strong>4. Máu gồm những thành phần và chức năng gì?</strong>
                  <span>
                    Máu là một chất lỏng lưu thông trong các mạch máu của cơ
                    thể, gồm nhiều thành phần, mỗi thành phần làm nhiệm vụ khác
                    nhau:
                  </span>
                  <span>- Hồng cầu làm nhiệm vụ chính là vận chuyển oxy;</span>
                  <span>- Bạch cầu làm nhiệm vụ bảo vệ cơ thể;</span>
                  <span>- Tiểu cầu tham gia vào quá trình đông cầm máu.</span>
                  <span>
                    - Huyết tương: gồm nhiều thành phần khác nhau: kháng thể,
                    các yếu tố đông máu, các chất dinh dưỡng...
                  </span>
                </p>
                <p className="grid grid-cols-1 gap-0 place-content-start ">
                  <strong>
                    5. Tại sao lại có nhiều người cần phải được truyền máu?
                  </strong>
                  <span>
                    Mỗi giờ có hàng trăm người bệnh cần phải được truyền máu vì
                    :
                  </span>
                  <span>
                    - Bị mất máu do chấn thương, tai nạn, thảm hoạ, xuất huyết
                    tiêu hoá...
                  </span>
                  <span>
                    - Do bị các bệnh gây thiếu máu, chảy máu: ung thư máu, suy
                    tuỷ xương, máu khó đông...
                  </span>
                  <span>
                    - Các phương pháp điều trị hiện đại cần truyền nhiều máu:
                    phẫu thuật tim mạch, ghép tạng...
                  </span>
                </p>
                <p className="grid grid-cols-1 gap-0 place-content-start ">
                  <strong>6. Nhu cầu máu điều trị ở nước ta hiện nay?</strong>
                  <span>
                    - Mỗi năm nước ta cần khoảng 1.800.000 đơn vị máu điều trị.
                  </span>
                  <span>
                    - Máu cần cho điều trị hằng ngày, cho cấp cứu, cho dự phòng
                    các thảm họa, tai nạn cần truyền máu với số lượng lớn.
                  </span>
                  <span>
                    - Hiện tại chúng ta đã đáp ứng được khoảng 54% nhu cầu máu
                    cho điều trị.
                  </span>
                </p>
                <p className="grid grid-cols-1 gap-0 place-content-start ">
                  <strong>
                    7. Tại sao khi tham gia hiến máu lại cần phải có giấy CMND?
                  </strong>
                  <span>
                    Mỗi đơn vị máu đều phải có hồ sơ, trong đó có các thông tin
                    về người hiến máu. Theo quy định, đây là một thủ tục cần
                    thiết trong quy trình hiến máu để đảm bảo tính xác thực
                    thông tin về người hiến máu.
                  </span>
                </p>
              </div>
            )}
            <h1 className="text-2xl flex justify-center ">
              (xin vui long đến đúng giờ đã hẹn)
            </h1>
          </div>
          <button
            type="submit"
            className="px-4 py-1 border-2 border-[#afafaf] w-[124px] h-[35px] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg  "
          >
            Đăng ký
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

export default BloodDonation;
