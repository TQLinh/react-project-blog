import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/auth-context";
import ManagementHeader from "./ManagementHeader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NoAccess from "../../Component/noAccess/NoAccess";
const ManagementLayout = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  useEffect(() => {
    if (Number(userInfo.role) !== 1 || !userInfo) {
      toast.warning("Bạn không có quyền truy cập trang này !");
    }
  }, [userInfo, userInfo.role]);
  return (
    <>
      {Number(userInfo.role) !== 3 ? (
        <div className="management">
          <ManagementHeader className="text-xl">
            Account Management
          </ManagementHeader>
          <div className="management-main">
            <Sidebar></Sidebar>
            <div className="management-children">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      ) : (
        <NoAccess></NoAccess>
      )}
    </>
  );
};

export default ManagementLayout;
