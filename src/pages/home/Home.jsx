import React, { useLayoutEffect } from "react";
import TitlePart from "../../components/titlePart/TitlePart";
import SlideShow from "../../components/slideShow/SlideShow";
import Categories from "../../components/categories/Categories";
import HealthNews from "../../components/healthNews/HealthNews";
import { useNavigate, useNavigation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import Banner from '../../assets/images/BannerHome.jpg';

function Home() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  // useLayoutEffect(() => {
  //   if (!auth) {
  //     navigate("/login");
  //   }
  // }, [auth, navigate]);
  return (
    <div className="">
      <div className="w-full  mx-auto  text-center mb-20">
        <img
          className="w-auto h-auto object-cover"
          src={Banner}
          alt="introduce"
        />
        <div className="w-full h-full absolute top-[20%]  ">
          <div className="flex flex-col items-start justify-start gap-[61px] max-w-full lg:gap-[30px_61px] mq750:gap-[15px_61px]">
            <div className="w-auto mt-[7%] ml-[35%] text-6xl font-bold  text-white text-center">
              Hương Vị Việt Nam
            </div>
            <div className="w-auto mt-[2%] ml-[20%]  text-xl font-normal  text-white text-center">
              <p className="m-0">
                Duyệt qua hàng ngàn công thức nấu ăn đa dạng, từ món ăn gia đình
                đến các món ăn đặc sản vùng miền hấp dẫn.
              </p>
              <p className="m-0">
                Tìm kiếm công thức theo nguyên liệu, theo chủ đề, theo dịp lễ
                Tết,... một cách dễ dàng và nhanh chóng.
              </p>
              <p className="m-0">
                Xem video hướng dẫn nấu ăn chi tiết, trực quan, giúp bạn dễ dàng
                thực hiện ngay cả khi bạn mới bắt đầu.
              </p>
              <p className="m-0">
                Tham gia cộng đồng yêu bếp, chia sẻ kinh nghiệm nấu nướng và học
                hỏi những bí quyết từ các đầu bếp tài năng.
              </p>
              <p className="m-0">
                Mua sắm nguyên liệu nấu ăn tươi ngon, chất lượng với giá cả cạnh
                tranh.
              </p>
            </div>

            <button class=" ml-11 text-4xl font-bold text-white text-center w-auto text-yellow-300 hover:text-yellow-600">
              {" "}
              Khám Phá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
