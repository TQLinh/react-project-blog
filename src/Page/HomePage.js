import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../Component/Layout/Layout";
import UpToTop from "../Component/upToTop/UpToTop";
import HomeNav from "../Module/Home/HomeNav";
const HomePage = () => {
  return (
    <div>
      <Layout>
        <HomeNav></HomeNav>
        <Outlet></Outlet>
      </Layout>
      <UpToTop></UpToTop>
    </div>
  );
};

export default HomePage;
