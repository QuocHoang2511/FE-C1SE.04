import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { api } from "../../apis";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Diet({ diet }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const isFav = auth && auth.diets.some((item) => item === diet._id);
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
  return (
    <div className="col-span-1 relative" key={diet._id}>
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() =>
          isFav ? handleRemoveFavorite(diet._id) : handleAddFavorite(diet._id)
        }
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: isFav ? "red" : "#fff" }}
        />
      </div>
      <Link to={`/food/${diet._id}`} className="w-full">
        <img
          src={diet.thumbnail || "https://i.ibb.co/p4D2qft/hitdat.jpg"}
          alt="img"
          className="w-full h-[180px] object-cover rounded-md"
        />
        <div className="mt-3">
          <p className="font-semibold mb-1">{diet.title}</p>
          <p className="text-sm line-clamp-2">{diet.description}</p>
        </div>
      </Link>
    </div>
  );
}
