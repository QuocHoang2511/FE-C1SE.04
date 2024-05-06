import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHeart,
  faLayerGroup,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { api } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";

const Exercise = ({ typeExrcise = "none", exercise }) => {
  console.log("exscise value - ", exercise);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const isFav = auth && auth.excercises.some((item) => item === exercise._id);
  const handleAddFavorite = async (_id) => {
    if (auth) {
      try {
        const { excercises } = auth;
        const newExercises = [...excercises, _id];
        const result = await api.put(`/api/user/${auth._id}`, {
          excercises: newExercises,
        });
        const updateAuth = {
          ...auth,
          excercises: newExercises,
        };
        setAuth(updateAuth);
        Cookies.remove("auth");
        Cookies.set("auth", JSON.stringify(updateAuth));
        toast.success("Đã thêm vào bài tập yêu thích", {
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
        toast.error("Xảy ra lỗi trong quá trình xử lý", {
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
    } else {
      navigate("/login");
    }
  };
  const handleRemoveFavorite = async (_id) => {
    if (auth) {
      try {
        const { excercises } = auth;
        const newExercises = excercises.filter((item) => item !== _id);
        const result = await api.put(`/api/user/${auth._id}`, {
          excercises: newExercises,
        });
        const updateAuth = {
          ...auth,
          excercises: newExercises,
        };
        setAuth(updateAuth);
        Cookies.remove("auth");
        Cookies.set("auth", JSON.stringify(updateAuth));
        toast.success("Đã bỏ bài tập trong yêu thích", {
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
        toast.error("Xảy ra lỗi trong quá trình xử lý", {
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
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="py-4 relative">
      <div
        className="font-bold absolute z-10 top-20 right-10 text-white"
        onClick={() =>
          isFav
            ? handleRemoveFavorite(exercise._id)
            : handleAddFavorite(exercise._id)
        }
      >
        <span className="pr-3">Saved</span>
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: isFav ? "red" : "#fff" }}
        />
      </div>
      <Link to={`/exrcise/${exercise?._id}`}>
        <div className="w-auto mx-3 rounded-xl hover:shadow-xl mt-[40px] transform transition-all translate-y-0 hover:-translate-y-2 ">
          <div className="h-[180px] w-full relative">
            <img
              className="w-full h-full object-cover rounded-t-xl"
              src={exercise?.thumbnail || "https://i.ibb.co/p4D2qft/hitdat.jpg"}
              alt="anh bai tap"
            />
            {/* {typeExrcise.toLowerCase() === 'top rate' &&
                            <p className="absolute top-3 left-3 uppercase bg-primaryColor rounded text-white text-xs font-semibold px-2 py-[1px] tracking-[.30em]">Top
                                rate</p>}
                        {typeExrcise.toLowerCase() === 'sharing' &&
                            <p className="absolute top-3 right-3 uppercase bg-primaryColor rounded text-white text-xs font-semibold px-2 py-[1px] tracking-[.30em]">Sharing</p>} */}

            {/* <div className=" absolute bottom-3 left-3 right-3 flex justify-between text-white">
              <div className="font-bold">
                <FontAwesomeIcon className="pr-3" icon={faLayerGroup} />
                <span>04 Photos</span>
              </div>
              <div className="font-bold">
                <span className="pr-3">Saved</span>
                <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000" }} />
              </div>
            </div> */}
          </div>
          <div className="rounded-b-xl bg-white border-[1px]">
            <div className="px-3 py-3 ">
              <p className="text-sm font-semibold text-primaryColor ">
                {exercise?.category?.name}
              </p>
              <h4 className="font-bold text-deep-purple-900  ">
                {exercise.name}
              </h4>
              <div className="flex justify-between items-center mb-2">
                <p className="line-clamp-3">{exercise.description}</p>
              </div>

              {/* <div className="mb-2">
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed00" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed00" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed00" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed00" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#d4d4d4" }} />
                <span className="ml-3 text-[#d4d4d4] ">12 review owners</span>
              </div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Exercise;
