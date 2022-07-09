import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import ManagementHeader from "../ManagementPage/ManagementHeader";
import { MenuAccount } from "../MenuLink/MenuLink";

const AccountManagement = () => {
  return (
    <div className="flex flex-col">
      <ManagementHeader className="text-xl">Tạo bài viết mới</ManagementHeader>
      <div className="w-full h-5"></div>
      <div className="container relative flex items-center gap-x-2">
        {MenuAccount.map((item) => {
          return (
            <NavLink
              to={item.url}
              key={item.id}
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-tl text-[35px] active from-purple-300 to-pink-300 menu-user"
                  : "menu-user"
              }
            >
              {item.icon}
              <span className=" title">{item.title || "title"}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="w-full h-5"></div>
      <div className="container ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AccountManagement;
