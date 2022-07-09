import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconFavourite from "../../Component/Icon/IconFavourite";
import { useToggle } from "../../Contexts/toggle-context";
import PostCategory from "./PostCategory";
import PostTime from "./PostTime";
import PostTitle from "./PostTitle";

const PostFeaturedItem = ({ data }) => {
  const navigate = useNavigate();
  const date = data.createAt ? data.createAt.seconds * 1000 : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  const { toggleFavourite } = useToggle();

  if (!data) return;
  return (
    <div className="relative overflow-hidden rounded-md h-[260px] w-[400px] cursor-pointer box">
      <div className="h-full ">
        <img
          className="h-full post-image "
          src={data.image}
          alt="set up zoom "
        />
      </div>
      <div className="absolute inset-0  post-overlay bg-[rgba(0, 0, 0, 0.75)]"></div>
      <div className="absolute inset-0 z-10 p-3 text-white rounded-md post-content">
        <div className="flex items-center justify-between mb-4 post-top">
          <PostCategory>{data?.category.name}</PostCategory>
          <div className="post-info">
            <PostTime
              date={formatDate}
              authorName={data.user.fullname}
            ></PostTime>
          </div>
        </div>
        <div className="flex justify-end px-3 cursor-pointer">
          <IconFavourite
            favourite={data?.favourite}
            onClick={() => toggleFavourite(data.id)}
          ></IconFavourite>
        </div>
        <div className="post-title" onClick={() => navigate(`/${data.slug}`)}>
          <PostTitle>{data.title}</PostTitle>
        </div>
      </div>
    </div>
  );
};

export default PostFeaturedItem;
