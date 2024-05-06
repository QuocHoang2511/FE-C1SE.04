import React, { useEffect, useState } from "react";
import SidebarUsers from "../../components/sidebarUsers/SidebarUsers";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../apis";
import Diet from "../../components/diet/Diet";
import Exercise from "../../components/exercise/Exercise";
import { useNavigate } from "react-router";

const Favorites = () => {
  const { auth } = useAuth();
  const [diets, setDiets] = useState([]);
  const [excercises, setExcercises] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) navigate("/login");
  });
  useEffect(() => {
    (async () => {
      if (auth) {
        try {
          const result = await api.get(`api/user/${auth._id}`);
          console.log("result - ", result.data);
          setDiets(result.data.diets);
          setExcercises(result.data.excercises);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [auth]);
  return (
    <div className=" pt-10 px-36 w-full h-screen flex flex-col overflow-y-scroll">
      <div className="flex w-full flex-auto">
        <SidebarUsers />
        <div className="flex-auto p-4">
          <h1 className="text-3x1 text-primaryColor text-lg font-medium py-4 border-b border-gray-200">
            Bài Tập & Chế Độ Ăn Yêu Thích
          </h1>
          <div className="gap-y-10">
            {excercises.length > 0 && (
              <div className="w-full space-y-7 py-4 ">
                <h2 className="uppercase font-semibold">Bài tập</h2>
                <div className="grid grid-cols-3 gap-x-5 gap-y-10">
                  {excercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} />
                  ))}
                </div>
              </div>
            )}
            {diets.length > 0 && (
              <div className="w-full space-y-7 py-4 ">
                <h2 className="uppercase font-semibold">Chế độ ăn</h2>
                <div className="grid grid-cols-3 gap-x-5 gap-y-10">
                  {diets.map((diet) => (
                    <Diet diet={diet} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
