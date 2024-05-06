import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";

const Categories = () => {
  const { auth } = useAuth();
  return (
    <>
      <div className=" max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-12">
        <Link to={`/health/${auth?._id}`}>
          <div className="h-[250px] relative group rounded-xl hover:shadow-lg overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-xl transition-all group-hover:-rotate-6 group-hover:scale-125 group-hover:transform group-hover:origin-center "
              src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="tập luyện"
            />
            <div className="absolute  opacity-60 top-0 left-0 right-0 bottom-0 rounded-xl"></div>
            <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
              <p className="block font-extrabold text-xl">Sức Khỏe</p>
              <span className="">Thông Tin Sức Khỏe</span>
              <div className="container mx-auto mt-10 text-center">
                <Link
                  to={`/health/${auth?._id}`}
                  className="inline-block px-3 py-2 rounded-md text-sm  border-primaryColor font-semibold transition-all bg-primaryColor  hover:shadow-primaryColor hover:shadow "
                >
                  Bắt Đầu
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-1  w-[15px] h-[15px] "
                  />
                </Link>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/">
          <div className="h-[250px] relative group rounded-xl hover:shadow-lg overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-xl transition-all group-hover:-rotate-6 group-hover:scale-125 group-hover:transform group-hover:origin-center "
              src="https://images.pexels.com/photos/7672092/pexels-photo-7672092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="tập luyện"
            />
            <div className="absolute  opacity-60 top-0 left-0 right-0 bottom-0 rounded-xl"></div>
            <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
              <p className="block font-extrabold text-xl">Tập Luyện</p>
              <span className="">Các Bài Tập Cải Thiện</span>
              <div className="container mx-auto mt-10 text-center">
                <Link
                  to="/healthExercises"
                  className="inline-block px-3 py-2 rounded-md text-sm  border-primaryColor font-semibold transition-all bg-primaryColor  hover:shadow-primaryColor hover:shadow "
                >
                  Bắt Đầu
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-1  w-[15px] h-[15px] "
                  />
                </Link>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/">
          <div className="h-[250px] relative group rounded-xl hover:shadow-lg overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-xl transition-all group-hover:-rotate-6 group-hover:scale-125 group-hover:transform group-hover:origin-center "
              src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="phòng"
            />
            <div className="absolute  opacity-60 top-0 left-0 right-0 bottom-0 rounded-xl "></div>
            <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
              <div className="">
                <p className="block font-extrabold text-xl shadow-4xl">
                  Thực Đơn
                </p>
                <span className="block shadow-4xl">Các Chế Độ Ăn Uống</span>
              </div>
              <div className="container mx-auto mt-10 text-center">
                <Link
                  to="/menu-food"
                  className="inline-block px-3 py-2 rounded-md text-sm  border-primaryColor font-semibold transition-all bg-primaryColor  hover:shadow-primaryColor hover:shadow "
                >
                  Bắt Đầu
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-1  w-[15px] h-[15px] "
                  />
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Categories;
