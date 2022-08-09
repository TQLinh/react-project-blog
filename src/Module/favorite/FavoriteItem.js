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
    <div className="relative mt-4 w-[350px] bg-slate-200 rounded-sm shadow-xl p-1">
      <div className="w-full h-[200px] overflow-hidden rounded-md">
        <img src={data.image} className="w-full h-full" alt="" />
      </div>
      <div className="flex flex-col w-full p-3 ">
        <div className="flex items-center justify-between">
          <PostCategory className="!text-sky-300">
            {data?.category.name}
          </PostCategory>
          <PostTime
            date={formatDate}
            authorName={data.user.fullname}
            className="text-black"
          ></PostTime>
        </div>
        <div
          className={`flex items-center cursor-pointer absolute top-2x left-2x ${
            updatepost ? "justify-between" : "justify-end"
          }`}
        >
          {updatepost && (
            <div
              onClick={() =>
                navigate(`/AccountManagement/update-post?id=${data.id}`)
              }
              className="p-1 font-semibold text-gray-600 bg-white rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute top-2x right-2x">
          <IconFavourite
            favourite={data?.favourite}
            onClick={() => toggleFavourite(data.id)}
          ></IconFavourite>
        </div>
        <div
          onClick={() => navigate(`/${data.slug}`)}
          title={data.title}
          className="overflow-x-hidden text-2xl mt-2x font-bold text-black h-[60px] text-ellipsis whitespace-nowrap"
        >
          {data.title}
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
