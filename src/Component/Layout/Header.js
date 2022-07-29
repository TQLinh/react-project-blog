import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";

const Header = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  useEffect(() => {
    document.title = "Personal-post-Home";
  }, []);

  return (
    <div className="bg-white">
      <div className="container header_main items-center justify-between flex max-h-[100px]">
        <Link to="/">
          <div className="flex items-center justify-center w-full ">
            <div className="block w-20 h-20">
              <img
                srcSet="/logoPen.png "
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
          <div className="flex items-center justify-between gap-1x">
            <Link
              className="flex items-center gap-x-1x py-1 px-2x rounded-lg bg-gradient-to-br from-[#9e6ef3] to-[#56e6e9] "
              to={
                Number(userInfo.role) === 1
                  ? "/manage/user"
                  : "/AccountManagement/user"
              }
            >
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  className="h-full"
                  title={userInfo.email}
                  src={userInfo.avatar}
                  alt="Ảnh đại điện"
                />
              </div>
              <button className="font-semibold text-white rounded-md">
                Create post
              </button>
            </Link>
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
