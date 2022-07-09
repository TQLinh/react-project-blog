import React, { Fragment } from "react";
import HomeFeatured from "../Module/Home/HomeFeatured";
import HomeFooter from "../Module/Home/HomeFooter";
import HomePosterList from "../Module/Home/HomePosterList";
import HomeSlider from "../Module/Home/HomeSlider";
const ContentHome = () => {
  return (
    <Fragment>
      <HomeSlider></HomeSlider>
      <HomeFeatured></HomeFeatured>
      <HomePosterList></HomePosterList>

      <HomeFooter></HomeFooter>
    </Fragment>
  );
};

export default ContentHome;
