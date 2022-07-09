import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";

const Header = () => {
  const Navigate = useNavigate();
  const { userInfo, setValue } = useAuth();
  console.log(userInfo);
  useEffect(() => {
    document.title = "Personal-post-Home";
  }, []);

  const Handlelogout = () => {
    setValue(null);
    Navigate("/signInPage");
  };

  return (
    <div className="bg-gradient-to-tr to-[#d0c698] from-[#ddade5]">
      <div className="container header_main items-center justify-between flex max-h-[100px]">
        <Link to="/">
          <div className="flex items-center justify-center w-full ">
            <div className="block w-20 h-20">
              <img
                srcSet="/logo_item.png "
                alt="logo item "
                className="object-cover w-full h-full logo"
              />
            </div>
            <div className="">
              <h1 className="block text-3xl font-bold text-white heading">
                Perspnal-Post
              </h1>
              <p className="text-sm text-[#cc07d5] ">
                Write down what you want to send to everyone
              </p>
            </div>
          </div>
        </Link>
        {userInfo?.email ? (
          <div className="flex items-center justify-between gap-2">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                className="h-full"
                title={userInfo.email}
                src={userInfo.avatar}
                alt="Ảnh đại điện"
              />
            </div>
            <Link
              to={
                userInfo.role === 1 ? "/manage/user" : "/AccountManagement/user"
              }
            >
              <button className="px-4 py-3 font-semibold text-pink-500 bg-blue-500 rounded-md">
                Create post
              </button>
            </Link>
            <div
              onClick={() => Handlelogout()}
              className="flex items-center gap-1 p-3 font-semibold text-white rounded-md justify-cente bg-slate-900"
            >
              <p className="">logOut</p>
              <ion-icon
                style={{ fontSize: "30px" }}
                name="log-out-outline"
              ></ion-icon>
            </div>
          </div>
        ) : (
          <Link to="/signInPage">
            <button className="px-4 py-3 font-semibold text-pink-500 bg-blue-500 rounded-md">
              LognIn
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
