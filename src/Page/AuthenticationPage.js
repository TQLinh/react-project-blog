import React from "react";

const AuthenticationPage = ({ children }) => {
  return (
    <div className="min-h-screen px-10 py-7 mx-auto  max-w-[550px] bg-gradient-to-tr to-pink-200 from-blue-500">
      <div className="flex items-center justify-center w-full ">
        <div className="block w-24 h-24">
          <img
            srcSet="/logo_item.png "
            alt="logo item "
            className="object-cover w-full h-full logo"
          />
        </div>
        <h1 className="block text-4xl font-bold text-white heading">
          Perspnal-Post
        </h1>
      </div>
      {children}
    </div>
  );
};

export default AuthenticationPage;
