import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../apis";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function FoodDetail() {
  const { foodId } = useParams();
  const [diet, setDiet] = useState();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const isFav = auth && auth.diets.some((item) => item === foodId);
  const handleAddFavorite = async (_id) => {
    if (auth) {
      try {
        const { diets } = auth;
        const newDiets = [...diets, _id];
        const result = await api.put(`/api/user/${auth._id}`, {
          diets: newDiets,
        });
        const updateAuth = {
          ...auth,
          diets: newDiets,
        };
        setAuth(updateAuth);
        Cookies.remove("auth");
        Cookies.set("auth", JSON.stringify(updateAuth));
        toast.success("Đã thêm vào thực đơn yêu thích", {
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
        const { diets } = auth;
        const newDiets = diets.filter((item) => item !== _id);
        const result = await api.put(`/api/user/${auth._id}`, {
          diets: newDiets,
        });
        const updateAuth = {
          ...auth,
          diets: newDiets,
        };
        setAuth(updateAuth);
        Cookies.remove("auth");
        Cookies.set("auth", JSON.stringify(updateAuth));
        toast.success("Đã bỏ thực đơn trong yêu thích", {
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
  console.log("slug - ", foodId);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get(`/api/diet/${foodId}`);
        console.log("result - ", result.data);
        setDiet(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [foodId]);
  if (diet)
    return (
      <div className="w-4/6 mx-auto my-10">
        <div className="grid grid-cols-7 gap-5">
          <div className="col-span-4">
            <img
              src={diet.thumbnail || "https://i.ibb.co/p4D2qft/hitdat.jpg"}
              alt="abc"
              className="w-full mx-auto h-[450px] object-cover rounded-xl"
            />
          </div>
          <div className="col-span-3">
            <div
              className="cursor-pointer flex gap-2 items-center"
              onClick={() =>
                isFav ? handleRemoveFavorite(foodId) : handleAddFavorite(foodId)
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
            <p className="font-semibold text-xl mb-5">{diet.title}</p>
            <p className="mt-3 font-medium mb-10">{diet.description}</p>
          </div>
        </div>
        <div className="my-10">{parse(diet.content)}</div>
      </div>
    );
  return;
}
