import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="!h-[100vh] flex items-center justify-center flex-col">
      <Link to="/" className="inline-block mb-10">
        <img className=" w-full max-w-[500px]" srcSet="/page404.webp" alt="" />
      </Link>
      <h1 className="mb-10 text-6xl font-semibold">Oh! Not found Page</h1>
      <Link
        to={"/"}
        className="flex items-center justify-between gap-2 p-2 text-2xl font-bold text-white bg-blue-400 rounded-lg"
      >
        <p className="">Back to Home</p>
        <ion-icon name="home"></ion-icon>
      </Link>
    </div>
  );
};

export default NotFoundPage;
