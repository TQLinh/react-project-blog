import React, { useEffect, useState } from "react";

const AuthorBox = ({ user = "", className = "" }) => {
  // if (!user) return;
  return (
    <div
      className={`flex author gap-2 shadow-xl p-1 rounded-3xl bg-pink-200  ${className}`}
    >
      <div className="author-image max-w-[400px] max-h-[300px] opacity-90 overflow-hidden rounded-3xl">
        <img
          className="h-full"
          src={
            user.avatar ||
            "https://images.unsplash.com/photo-1616710556836-a0f92f64b4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          }
          alt=""
        />
      </div>
      <div className="flex-1 author-content">
        <h2 className="py-1 font-bold author-name">
          {user.fullname || " Trần Linh"}
        </h2>
        <p className="author-desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          non animi porro voluptates quibusdam optio nulla quis nihil ipsa error
          delectus temporibus nesciunt, nam officiis adipisci suscipit voluptate
          eum totam!
        </p>
      </div>
    </div>
  );
};

export default AuthorBox;
