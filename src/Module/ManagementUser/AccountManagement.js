import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";
import HomeFooter from "../Home/HomeFooter";
import ManagementHeader from "../ManagementPage/ManagementHeader";
import { MenuAccount } from "../MenuLink/MenuLink";

const AccountManagement = () => {
  const { setValue } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    setValue(null);
    navigate("/signInPage");
  };
  return (
    <div className="flex flex-col">
      <ManagementHeader className="text-xl">Tạo bài viết mới</ManagementHeader>
      <div className="w-full h-5"></div>
      <div className="container relative flex items-center gap-x-2">
        {MenuAccount.map((item) => {
          if (item.onClick) {
            return (
              <NavLink
                to={item.url}
                key={item.id}
                onClick={() => handleLogOut()}
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
          }
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
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default AccountManagement;
