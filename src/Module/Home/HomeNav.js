import React from "react";
import { NavLink } from "react-router-dom";
import MenuLink from "../MenuLink/MenuLink";

const menu = MenuLink;
const HomeNav = () => {
  return (
    <div className="h-[50px] flex  bg-gradient-to-l to-[#61ce1f] gap-1 from-orange-400">
      <ul className="container flex items-center justify-between nav">
        <div className="flex items-center ">
          {menu.map((item) => {
            const { url, title, icon } = item;
            return (
              <NavLink
                key={item.id}
                to={url}
                className={({ isActive }) =>
                  isActive ? " bg-[#0a7960] rounded" : ""
                }
              >
                <li className="flex items-center gap-1 px-2 py-1 text-xl text-white">
                  {icon}
                  <p>{title}</p>
                </li>
              </NavLink>
            );
          })}
        </div>
        <div className="relative flex items-center ">
          <input
            type="text"
            className="flex-1 p-1 border-2 border-gray-500 rounded-md "
            placeholder="search"
          />
          <div className="absolute right-[1px] flex items-center p-[8px] text-xl rounded-md top-2/4 bg-slate-500 -translate-y-2/4">
            <ion-icon name="search-outline"></ion-icon>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default HomeNav;
