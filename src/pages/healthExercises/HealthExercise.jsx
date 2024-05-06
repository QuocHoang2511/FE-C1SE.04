import React, { useEffect, useState } from "react";
import LayoutListExercise from "../../layouts/LayoutListExercise";
import { api } from "../../apis";
import { Pagination } from "antd";
import { toast } from "react-toastify";
const customStyle = {
  background:
    "linear-gradient(180deg, rgba(107, 162, 193, 0.99) 0%, rgba(249, 249, 249, 0.00) 100%)",
};
const PAGE_SIZE = 6;
function HealthExercises() {
  const [exercises, setExercises] = useState([]);
  const [categories, setCtegories] = useState([]);
  const [category, setCategory] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  console.log("page index - ", pageIndex);
  console.log("excersies - ", exercises);
  console.log("category - ", category);
  const pagExcercises =
    exercises.length > 0 &&
    exercises.slice((pageIndex - 1) * PAGE_SIZE, pageIndex * PAGE_SIZE);
  useEffect(() => {
    (async () => {
      try {
        const results = await api.get("/api/category");
        console.log("result - ", results.data);
        setCtegories(results.data);
      } catch (error) {
        console.log("error - ", error);
        toast.error("Xảy ra lỗi trong quá trình xử lý", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get("/api/exercise");
        setExercises(result.data);
      } catch (error) {
        console.log("error - ", error);
      }
    })();
  }, []);
  return (
    <div className=" sm:max-w-full sm:h-auto">
      <div class="  w-auto mt-8  ">
        <h1 className="  text-blue-600 text-4xl font-bold font-serif leading-[40px] break-words text-center">
          Mẹo Luyện Tập
        </h1>

        <h1 className=" mx-72 text-blue-600 text-2xl font-bold font-serif leading-[40px] break-words text-center">
          Lên kế hoạch thể dục hợp lý để biết bạn sẽ làm gì, khi nào và trong
          bao lâu. Điều này giúp bạn duy trì tập luyện đều đặn.
        </h1>
      </div>

      <select
        name=""
        id=""
        class=" mt-8 ml-44 px-4 py-2 top-[1%] border-[1px] border-[#B2B2B2] rounded-xl outline-none"
        onChange={(e) => {
          console.log("e.target.value - ", e.target.value);
          setCategory(e.target.value);
        }}
      >
        <option value={0}>Loại Bài Tập:</option>
        {categories.map((cate) => (
          <option key={cate._id} value={cate._id}>
            {cate.name}
          </option>
        ))}
      </select>
      <div className="max-w-[1200px] mx-auto px-10 my-10  grid grid-cols-12 gap-5">
        <div
          style={customStyle}
          class="md:col-span-12 md:col-start-1 rounded-[10px]"
        >
          <LayoutListExercise
            type="healthExercises"
            exerciseList={
              !category || category === "0"
                ? pagExcercises
                : pagExcercises.filter(
                    (item) => category && category === item.category._id
                  )
            }
          />
          <div className="flex justify-end mt-14">
            <Pagination
              hideOnSinglePage
              defaultCurrent={1}
              total={exercises.length}
              pageSize={PAGE_SIZE}
              onChange={(page) => setPageIndex(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthExercises;
