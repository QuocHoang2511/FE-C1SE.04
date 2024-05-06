import React from "react";
import bannerImage from "../../assets/images/BannerHome.jpg";
import image1 from "../../assets/images/Img2.png";
import image2 from "../../assets/images/Img3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faUsers,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";

function AboutPage() {
  return (
    <div>
      <div class="relative w-full ">
        <img
          src={bannerImage}
          alt="About page"
          class="w-full  h-[400px] object-cover"
        />
        <span class="absolute top-36 left-[300px] p-2 text-white text-5xl font-bold leading-6 drop-shadow-md">
          Giới Thiệu
        </span>
      </div>
      <div>
        <div className="w-[90%] flex justify-between mt-24 mx-auto max-w-screen-xl">
        <div className="flex-1 pl-20 ">
						<img
							className="h-[400px] rounded-xl w-[90%] "
							src={image1}
							alt=""
						/>
					</div>
          <div className="flex-[-33rem] mt-28">
            <h2 className="text-black  text-2xl font-extrabold mb-8">
              Hương Vị Việt Nam
            </h2>
            <span className="pr-28 leading-6">
              "Hương Vị Việt Nam" là không gian trực tuyến độc đáo và
              <br />
              đầy màu sắc, nơi mà bạn sẽ bắt gặp hương thơm, hương vị,
              <br /> và câu chuyện của ẩm thực Việt Nam. Chúng tôi là một cổng{" "}
              <br />
              thông tin toàn diện, mở cửa cho những trải nghiệm ẩm thực <br />
              tuyệt vời và sâu sắc.
            </span>
          </div>
        </div>
        <div className="w-full flex justify-between m-28  mx-auto max-w-screen-xl">
					<div className="flex-1 pl-20 mt-32">
						=
						<span className="pr-20 leading-6">
							Mục tiêu là đáp ứng nhu cầu quan trọng trong việc
							quản lý, <br /> theo dõi tình trạng sức khỏe của
							sinh viên Đại học Duy Tân <br />
							(DTU), cung cấp những thông tin và gợi ý quan tSrọng
							về <br />
							cách cải thiện vấn đề sức khỏe, chế độ ăn uống và
							tập luyện <br /> của bạn.
						</span>
					</div>
					<div className="flex-1 ">
						<img
							className="h-[360px] rounded-xl"
							src={image2}
							alt=""
						/>
					</div>
				</div>
      </div>
    </div>
  );
}

export default AboutPage;
