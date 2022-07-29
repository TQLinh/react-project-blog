import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";
import { db } from "../../firebase-config/firebase-config";
import BoxTitleUser from "./BoxTitile/BoxTitleUser";
const size = 3;
const Account = () => {
  const { userInfo } = useAuth();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("email", "==", userInfo.email));
    onSnapshot(q, (data) => {
      data.forEach((item) => {
        setUser({ id: item.id, ...item.data() });
      });
    });
  }, [userInfo]);
  const date = new Date(user?.createAt.seconds * 1000).toLocaleDateString();

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <div type="success">active</div>;
      case 2:
        return <div type="warning">Pending</div>;
      case 3:
        return <div type="danger">Rejected</div>;
      default:
        break;
    }
  };
  const renderRole = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "MOD";
      case 3:
        return "User";
      default:
        break;
    }
  };
  const boxZoom = useRef();
  const refZoom = useRef();
  const refEven = useRef();
  const refImg = useRef();
  const result = refZoom.current !== undefined && refZoom.current.classList;
  const img = refImg.current;
  console.log("img: ", img);
  refEven.current !== undefined &&
    refEven.current.addEventListener("mousemove", (e) => {
      result.remove("hide");
      let x = (e.offsetX / img.offsetWidth) * 100;
      let y = (e.offsetY / img.offsetHeight) * 100;
      const positionX = e.pageX - boxZoom.current.offsetLeft;
      const positionY = e.pageY - boxZoom.current.offsetTop;

      refZoom.current.style.cssText = `
      background-image:url(${img.src});
      background-size:${img.width * size}px ${img.height * size}px;
      background-position:${x}% ${y}%;
      left: ${positionX}px;
      top: ${positionY}px;
      `;
    });
  refEven.current !== undefined &&
    refEven.current.addEventListener("mouseleave", (e) => {
      refZoom.current.style = "";
      result.add("hide");
    });
  if (!userInfo) return;
  return (
    <div className="flex gap-5 transition-all top-4">
      <div className="relative zoom w-full max-w-[600px]" ref={boxZoom}>
        <div
          ref={refEven}
          className="box-img  max-w-[600px] overflow-hidden rounded-xl max-h-[400px] w-full h-full"
        >
          <img ref={refImg} src={user?.avatar} alt="" className="h-full" />{" "}
        </div>
        <div ref={refZoom} className="magnifying_glass hide"></div>
      </div>
      <div className="flex-1 p-2 bg-purple-200 rounded-xl">
        <div>
          <BoxTitleUser className="!text-4xl font-bold ">
            <span>Full Name:</span>
            <span>{user?.fullname}</span>
          </BoxTitleUser>
          <BoxTitleUser className="text-xl font-semibold">
            <span className="px-2 py-1 text-white bg-gray-500 rounded-xl">
              Email:{" "}
            </span>
            <span className="px-2 py-1 bg-white rounded-md">{user?.email}</span>
          </BoxTitleUser>
          <BoxTitleUser className="text-xl font-semibold">
            <span className="px-2 py-1 text-white bg-gray-500 rounded-xl">
              Username:{" "}
            </span>
            <span className="px-2 py-1 bg-white rounded-md">
              {user?.username}
            </span>
          </BoxTitleUser>
          <BoxTitleUser className="text-xl font-semibold">
            <span className="px-2 py-1 text-white bg-gray-500 rounded-xl">
              Password:{" "}
            </span>
            <span className="px-2 py-1 bg-white rounded-md">
              {user?.password}
            </span>
          </BoxTitleUser>
          <BoxTitleUser className="text-xl font-semibold">
            <span className="px-2 py-1 text-white bg-gray-500 rounded-xl">
              Role:{" "}
            </span>
            <span className="px-2 py-1 bg-white rounded-md">
              {renderRole(Number(user?.role))}
            </span>
          </BoxTitleUser>
          <BoxTitleUser className="text-xl font-semibold">
            <span className="px-2 py-1 text-white bg-gray-500 rounded-xl">
              Status:{" "}
            </span>
            <span className="px-2 py-1 bg-white rounded-md">
              {renderStatus(user?.status)}
            </span>
          </BoxTitleUser>
          <BoxTitleUser className="text-xl font-semibold">
            <span className="px-2 py-1 text-white bg-gray-500 rounded-xl">
              Ngày đăng ký tài khoản:
            </span>
            <span className="px-2 py-1 bg-white rounded-md">{date}</span>
          </BoxTitleUser>
        </div>
        <div className="flex-1 ">
          <span
            className="flex justify-center flex-1 w-full p-4 text-2xl font-bold text-center text-white bg-pink-500 rounded-xl"
            onClick={() =>
              navigate(`/AccountManagement/updateAccount?id=${user?.id}`)
            }
          >
            Update User
          </span>
        </div>
      </div>
    </div>
  );
};

export default Account;
