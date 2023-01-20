import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";
import IconBell from "../Icon/IconBell";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
const Header = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [boxNotification, setBoxNotification] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.title = "Personal-post-Home";
  }, []);
  if (!userInfo?.email) {
    navigate("/signInPage");
  }
  useEffect(() => {
    async function fetchUser() {
      const colRef = query(
        collection(db, "chatUser"),
        where("idUser", "==", userInfo.id)
      );
      const notification = await getDocs(colRef);
      const data = [];
      notification.forEach((doc) => {
        if (doc.data().watched === false) {
          data.push({ ...doc.data(), id: doc.id });
        }
      });
      setBoxNotification(data);
    }
    fetchUser();
  }, [userInfo?.id]);
  return (
    <div className="bg-white shadow-md select-none px-2x lg:px-0">
      <div className="container header_main items-center justify-between flex max-h-[100px]">
        <Link to="/">
          <div className="flex items-center justify-center w-full gap-2 ">
            <div className="block w-6x h-6x">
              <img
                srcSet="/iconb.ico "
                alt="logo item "
                className="object-cover w-full h-full logo"
              />
            </div>
            <div className="">
              <h1 className="block text-3xl font-bold text-white heading">
                Perspnal-Post
              </h1>
              <p className="text-sm text-[#37d1f4] font-semibold">
                Write down what you want to send to everyone
              </p>
            </div>
          </div>
        </Link>
        {userInfo?.email ? (
          <div className="flex items-center justify-between gap-1x">
            <Link
              to={"/AccountManagement/mailbox"}
              className="relative p-2 border border-gray-400 rounded-full mr-3x"
            >
              <div className="text-gray-500">
                <IconBell></IconBell>
              </div>
              <span className="absolute flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full w-2x h-2x -top-1 -right-1 ">
                {boxNotification.length || 0}
              </span>
            </Link>
            <div
              onClick={() => setShow(!show)}
              className="relative z-40 flex items-center p-1 gap-x-2 "
            >
              <div
                className={`w-10 h-10 transition-all overflow-hidden rounded-full ${
                  show ? "shadow-[0px_0px_7px_2px_#0C66B0]" : ""
                }`}
              >
                <img
                  className="h-full"
                  title={userInfo.email}
                  src={userInfo.avatar}
                  alt="Ảnh đại điện"
                />
              </div>
              <span
                className={`flex items-center text-xl  ${
                  show ? "text-sky-800" : "text-gray-500"
                }`}
              >
                <ion-icon name="chevron-down-sharp"></ion-icon>
              </span>
              {show && (
                <div className="absolute right-0 flex flex-col p-1 bg-white border rounded-md px-1x border-sky-400 top-full">
                  <Link
                    className="font-semibold border-b border-black whitespace-nowrap text-sky-400"
                    to={
                      Number(userInfo.role) === 1 || Number(userInfo.role) === 2
                        ? "/manage/user"
                        : "/AccountManagement/user"
                    }
                  >
                    Manage user
                  </Link>
                  <Link
                    className="font-semibold text-green-400 whitespace-nowrap"
                    to={"/AccountManagement/createpost"}
                  >
                    Write post
                  </Link>
                </div>
              )}
              {/* <button className="text-xl font-bold text-white rounded-md">
                Create post
              </button> */}
            </div>
          </div>
        ) : (
          <Link to="/signInPage">
            <button className="px-4 py-3 font-semibold text-white bg-gradient-to-br from-[#9e6ef3] to-[#56e6e9] rounded-md">
              LognIn
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
