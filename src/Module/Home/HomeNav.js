import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";
import MenuLink from "../MenuLink/MenuLink";

const menu = MenuLink;
const HomeNav = () => {
  const Navigate = useNavigate();
  const { userInfo, setUserInfo } = useAuth();
  const Handlelogout = () => {
    setUserInfo(null);
    Navigate("/signInPage");
  };

  return (
    <div className="flex items-center gap-1 py-1 bg-white shadow-xl px-2x lg:px-0">
      <div className="container flex items-center justify-between overflow-x-auto nav">
        <ul className="flex items-center ">
          {menu.map((item) => {
            const { url, title, icon } = item;
            return (
              <NavLink
                key={item.id}
                to={url}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-600 font-semibold rounded"
                    : "text-gray-500"
                }
              >
                <li className="flex items-center gap-1 px-2 text-xl whitespace-nowrap">
                  {icon}
                  <p>{title}</p>
                </li>
              </NavLink>
            );
          })}
        </ul>
        {userInfo?.email && (
          <div
            onClick={() => Handlelogout()}
            className="flex items-center text-xl font-semibold rounded-md nav text-sky-600 "
          >
            LogOut
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNav;
