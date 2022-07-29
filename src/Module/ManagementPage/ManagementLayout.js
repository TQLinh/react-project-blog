import React from "react";
import { Outlet } from "react-router-dom";
import ManagementHeader from "./ManagementHeader";
import Sidebar from "./Sidebar";

const ManagementLayout = () => {
  return (
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
  );
};

export default ManagementLayout;
