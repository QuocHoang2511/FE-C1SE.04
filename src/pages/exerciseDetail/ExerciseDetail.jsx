import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../apis";
import YouTube from "react-youtube";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ExerciseDetail = () => {
  const { exercisId } = useParams();
  const [excercise, setExcercise] = useState();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const isFav = auth && auth.excercises.some((item) => item === exercisId);

  console.log("slug - ", exercisId);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get(`/api/exercise/${exercisId}`);
        console.log("result - ", result.data);
        setExcercise(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [exercisId]);
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
  if (excercise)
    return (
      <>
        <div className=" sm:max-w-full sm:h-auto">
          <div class="  w-auto mt-8  ">
            <h1 className="  text-blue-600 text-4xl font-bold font-serif leading-[40px] break-words text-center">
              Mẹo Luyện Tập
            </h1>

            <h1 className=" px-72 text-blue-600 text-2xl font-bold font-serif leading-[40px] break-words text-center">
              Lên kế hoạch thể dục hợp lý để biết bạn sẽ làm gì, khi nào và
              trong bao lâu. Điều này giúp bạn duy trì tập luyện đều đặn.
            </h1>
          </div>
          <div className="w-3/4 mx-auto grid grid-cols-7 gap-5 mt-5">
            <div className="col-span-4">
              <img
                src={excercise.thumbnail}
                alt={excercise.name}
                className="w-full h-[350px] object-cover rounded-xl"
              />
            </div>

            <div className="col-span-3">
              <div
                className="cursor-pointer flex items-center gap-2"
                onClick={() =>
                  isFav
                    ? handleRemoveFavorite(exercisId)
                    : handleAddFavorite(exercisId)
                }
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: isFav ? "red" : "#ccc" }}
                />
                <p className="font-medium">
                  {isFav ? "Remove Favorite" : "Add Favorite"}
                </p>
              </div>
              <h1 className="text-xl font-semibold mb-4">{excercise.name}</h1>
              <p className="font-medium">{excercise.description}</p>
            </div>
          </div>

          <div className="w-3/4 mx-auto">
            <div className="my-10">{parse(excercise.content)}</div>
            <YouTube
              videoId={excercise.videoLink}
              opts={{ width: "100%", height: 450 }}
            />
          </div>
        </div>
      </>
    );
  return;
};

export default ExerciseDetail;
