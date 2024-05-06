import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../apis";
import { Pagination } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Diet from "../../components/diet/Diet";

const PAGE_SIZE = 6;

function MenuFood() {
  const [diets, setDiets] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  console.log("page index - ", pageIndex);
  const pagDiets =
    diets.length > 0 &&
    diets.slice((pageIndex - 1) * PAGE_SIZE, pageIndex * PAGE_SIZE);
  console.log("pag diet - ", pagDiets);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get("/api/diet");
        setDiets(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  return (
    <div className="my-10">
      <h2 className="text-center text-xl font-semibold uppercase">
        Danh sách Thực đơn
      </h2>
      <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-16 w-3/5 mx-auto">
        {pagDiets.length > 0 &&
          pagDiets.map((diet) => {
            return <Diet diet={diet} />;
          })}
      </div>
      {diets.length > 0 && (
        <div className="w-3/5 mx-auto flex justify-end mt-20">
          <Pagination
            hideOnSinglePage
            defaultCurrent={1}
            total={diets.length}
            pageSize={PAGE_SIZE}
            onChange={(page) => setPageIndex(page)}
          />
        </div>
      )}
    </div>
  );
}

export default MenuFood;
