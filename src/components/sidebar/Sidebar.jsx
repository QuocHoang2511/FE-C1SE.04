import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardXML } from "../../icon";
import prohealthImage from "../../assets/images/ProHealth.png";
const dashboardMenu = [
  {
    title: "Dashboard",
    pathName: "/admin/dashboard",
  },
  { title: "Tài khoản", pathName: "/admin/acount" },
  { title: "Liên hệ", pathName: "/admin/contact" },
  { title: "Hiến máu", pathName: "/admin/bloodGroup" },
  { title: "Sự kiện", pathName: "/admin/event" },
  { title: "Danh mục bài tập", pathName: "/admin/categoryExercise" },
  { title: "Bài tập sức khỏe", pathName: "/admin/exercise" },
  { title: "Chế độ ăn uống", pathName: "/admin/diet" },
  { title: "Thông tin sức khỏe", pathName: "/admin/topic" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="w-[250px] shrink-0 grow-0 pt-10 px-3 space-y-3 border-r border-r-black min-h-screen">
      <img src={prohealthImage} className="mr-3 h-6 sm:h-9 mb-10" alt="ProHealth" />
      {dashboardMenu.map(({ title, pathName }) => {
        const active = pathName === pathname;
        return (
          <div
            key={title}
            className={`flex gap-2 py-2 rounded-lg justify-center cursor-pointer ${
              active
                ? "bg-blue-gray-500 font-semibold text-white "
                : "font-medium bg-blue-gray-100 text-black"
            }`}
          >
            <Link to={pathName}>
              <span>{title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
