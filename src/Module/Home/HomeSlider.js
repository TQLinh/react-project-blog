import { Slider } from "infinite-react-carousel/lib";
import React from "react";

const HomeSlider = () => {
  const listImage = [
    {
      id: 1,
      url: "https://phunugioi.com/wp-content/uploads/2020/02/anh-phong-canh-hung-vy-nui-va-song.jpg",

      title: "New image",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum cumque veniam error modi in aut nemo facilis,",
    },
    {
      id: 2,
      url: "https://2.bp.blogspot.com/-ZHxPeVGAFBE/WdZPErRG3SI/AAAAAAAAETI/7q__R5Xj36UhWk2lg2p9KbStwghB7UmpQCLcBGAs/s1600/tranh-kinh-phong-canh-6.jpg",
      title: "New image",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum cumque veniam error modi in aut nemo facilis,",
    },
    {
      id: 3,
      url: "https://bloganh.net/wp-content/uploads/2020/08/anh-thumb-1-696x464.jpg",
      title: "New image",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum cumque veniam error modi in aut nemo facilis,",
    },
    {
      id: 4,
      url: "https://i.imgur.com/OTfFpey.png",
      title: "New image",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum cumque veniam error modi in aut nemo facilis,",
    },
    {
      id: 5,
      url: "https://phunugioi.com/wp-content/uploads/2020/03/anh-anime-full-hd-4k-scaled.jpg",
      title: "New image",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum cumque veniam error modi in aut nemo facilis,",
    },
  ];
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
    <div className="slider">
      <Slider {...settings}>
        {listImage.map((img) => (
          <div className="box-img" key={img.id}>
            <img className="image" src={img.url} alt="" />
            <div className="content">
              <div>
                <h2>{img.title}</h2>
                <p>{img.content}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
