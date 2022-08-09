import { Slider } from "infinite-react-carousel/lib";
import React from "react";
import parse from "html-react-parser";
import Button from "../../Component/Button/Button";
import { useToggle } from "../../Contexts/toggle-context";
import { useNavigate } from "react-router-dom";
const HomeSlider = () => {
  const { storedValue } = useToggle();
  const navigate = useNavigate();
  const settings = {
    dots: false,
    // dotsClass: "!flex",
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    // autoplay: true,
    // duration: 100,
    // className: "px-2",
    autoplaySpeed: 2000,
    slidesPerRow: 1,
    shift: 0, // khoảng cách giữa các mục
    appendDots: (dots) => {
      console.log(dots[1]);
      return <ul style={{ display: "flex" }}>{dots}</ul>;
    },
    accessibility: true,
    dotsClass: "p-3 rounded-full shadow-sm",
    nextArrow: <ion-icon name="chevron-forward-sharp" id="icon"></ion-icon>,
    prevArrow: <ion-icon name="chevron-back-sharp" id="icon"></ion-icon>,
  };
  return (
    <div className="mt-1 slider">
      <Slider {...settings}>
        {storedValue.slice(1, 6).map((data) => (
          <div className="box-img" key={data.id}>
            <img className="image" src={data.image} alt="" />
            <div className="content">
              <div>
                <h2>{data.title}</h2>
                <div>{parse(data.content.slice(0, 400) + "...")}</div>
                <Button
                  onClick={() => navigate(`/${data.slug}`)}
                  className="max-w-[200px] font-semibold opacity-0 translate-y-[500px] mx-0 flex justify-start see"
                >
                  See more +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
