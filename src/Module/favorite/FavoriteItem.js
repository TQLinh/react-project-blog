import React from "react";
import { useNavigate } from "react-router-dom";
import IconFavourite from "../../Component/Icon/IconFavourite";
import { useToggle } from "../../Contexts/toggle-context";
import PostCategory from "../Posts/PostCategory";
import PostTime from "../Posts/PostTime";

const FavoriteItem = ({ data, updatepost }) => {
  const navigate = useNavigate();
  const date = new Date(
    data?.createAt ? data.createAt.seconds * 1000 : new Date()
  );
  const { toggleFavourite } = useToggle();
  const formatDate = date.toLocaleDateString("vi-VI");
  return (
    <div className="relative flex items-center mt-2 w-[400px] h-[250px] overflow-hidden rounded-sm">
      <div className="w-full h-full ">
        <img src={data.image} className="h-full" alt="" />
      </div>
      <div className="absolute flex flex-col w-full p-3 top-1">
        <div className="flex items-center justify-between">
          <PostCategory>{data?.category.name}</PostCategory>
          <PostTime
            date={formatDate}
            authorName={data.user.fullname}
            className=""
          ></PostTime>
        </div>
        <div
          className={`flex mt-3 items-center cursor-pointer ${
            updatepost ? "justify-between" : "justify-end"
          }`}
        >
          {updatepost && (
            <div
              onClick={() =>
                navigate(`/AccountManagement/update-post?id=${data.id}`)
              }
              className="p-1 font-semibold text-white bg-pink-300 rounded-md"
            >
              Update post
            </div>
          )}
          <IconFavourite
            favourite={data?.favourite}
            onClick={() => toggleFavourite(data.id)}
          ></IconFavourite>
        </div>
      </div>
      <div
        onClick={() => navigate(`/${data.slug}`)}
        className="absolute p-5 text-2xl font-bold text-white"
      >
        {data.title}
      </div>
    </div>
  );
};

export default FavoriteItem;
