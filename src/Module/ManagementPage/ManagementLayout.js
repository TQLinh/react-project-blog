import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";
import ManagementHeader from "./ManagementHeader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NoAccess from "../../Component/noAccess/NoAccess";
import IconBell from "../../Component/Icon/IconBell";
import ActionDelete from "../../Component/action/ActionDelete";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
import parse from "html-react-parser";
const ManagementLayout = () => {
  // const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    if (Number(userInfo.role) === 3 || !userInfo) {
      toast.warning("Bạn không có quyền truy cập trang này !");
    }
  }, [userInfo, userInfo.role]);
  useEffect(() => {
    const colRef = collection(db, "boxNotification");
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setNotification(results);
    });
  }, []);
  const handleDelete = async (id) => {
    if (!id) return;
    const data = doc(db, "boxNotification", id);
    await deleteDoc(data);
    // deleteUser(id);
  };
  return (
    <>
      {Number(userInfo.role) !== 3 ? (
        <div className="management">
          <ManagementHeader className="text-xl">
            Account Management
          </ManagementHeader>
          <div className="grid-cols-8 desktop:grid-cols-5 laptop:grid-cols-7 management-main">
            <Sidebar className="col-span-1"></Sidebar>
            <div className="col-span-7 desktop:col-span-4 laptop:col-span-6 management-children">
              <Outlet></Outlet>
              <div className="h-3x"></div>
            </div>
          </div>
        </div>
      ) : (
        <NoAccess></NoAccess>
      )}
      <div className="fixed group p-2 border bg-white border-gray-600 rounded-full top-[110px] right-60">
        <span className="text-gray-700">
          <IconBell></IconBell>
        </span>
        <span className="absolute flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full w-2x h-2x -top-1 -right-1 ">
          {notification.length}
        </span>
        <div className="absolute top-0 flex-col hidden gap-2 p-1 bg-white border border-gray-500 rounded-tr-lg rounded-bl-lg group-hover:flex right-full whitespace-nowrap">
          {notification.map((item) => {
            const formatTime = new Date(
              item.createAt.seconds * 1000
            ).toLocaleString("vi-VI");
            return (
              <div
                onClick={() => handleDelete(item.id)}
                key={item.id}
                title={item.email}
                className="flex items-center justify-between px-2 py-1 border border-gray-300 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  {" "}
                  <div className="overflow-hidden rounded-full w-3x h-3x">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="w-[400px]">
                    <p className="text-sm font-semibold whitespace-nowrap ">
                      Time: {formatTime}
                    </p>
                    <div className="flex items-center gap-1 whitespace-normal">
                      <p>Title: </p>
                      {parse(item.title)}
                    </div>
                  </div>
                </div>
                <ActionDelete className="w-8 h-8 text-white bg-gray-400 hover:bg-red-500"></ActionDelete>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ManagementLayout;
