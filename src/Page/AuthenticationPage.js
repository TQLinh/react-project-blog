import React from "react";
import LoginWithFB from "../Component/logins/LoginWithFB";
import LoginWithGG from "../Component/logins/LoginWithGG";
const AuthenticationPage = ({ children }) => {
  return (
    <div className="relative flex items-center min-h-screen m-auto overflow-hidden bg-black p-1x py-7">
      <div className="w-[400px] h-[400px] rounded-full absolute bg-[#d70b9d] overflow-hidden blur-[200px] rotate-45 top-4 right-4 "></div>
      <div className="w-[700px] h-[400px] rounded-full absolute bg-[#4abfeac7] opacity-90 blur-[200px] rotate-45 right-4 bottom-0 "></div>
      <div className="w-[600px] h-[400px] rounded-full absolute bg-[#cb0ded] opacity-80 blur-[300px] rotate-45 bottom-4 left-4 "></div>
      <div className="w-[150px] h-[150px] rounded-full absolute bg-gradient-to-tr from-[#876afcb1] to-[#7af8fac2] opacity-70 shadow-[0px_0px_30px_#0d97ed] rotate-45 top-4 left-4 "></div>
      <div className="max-w-[1000px] min-w-[300px] w-full relative  top-0 bg-[#ffffffc1] py-3x px-4x mx-auto rounded-xl overflow-hidden">
        <div className="w-[600px] h-[500px] rounded-full -z-0  absolute bg-[#68e6f7a7]  blur-[100px] -right-4x -top-4x "></div>
        <div className="w-[700px] h-[400px] overflow-hidden rounded-full absolute -z-0  bg-[#ff00d4a3] blur-[300px] -left-4x -bottom-4x "></div>
        <>
          <LogoWeb></LogoWeb>
        </>
        <div className="relative z-10 flex flex-wrap items-center justify-center mt-4 gap-x-3x gap-y-1">
          <LoginWithFB></LoginWithFB>
          <LoginWithGG></LoginWithGG>
        </div>
        <div className="relative z-10 block font-bold text-center text-gray-600 text-2x mt-1x">
          -- Or --
        </div>
        <div className="max-w-[500px] w-full mx-auto mt-1x">{children}</div>
      </div>
    </div>
  );
};
const LogoWeb = () => {
  return (
    <div className="relative z-20 flex items-center justify-center w-full ">
      <div className="block w-16 h-16">
        <img
          srcSet="/logoPen.png 2x"
          alt="logo item "
          className="object-cover w-full h-full logo"
        />
      </div>
      <h1 className="relative z-20 text-2xl font-bold md:text-4xl logo">
        Perspnal-Post
      </h1>
    </div>
  );
};

export default AuthenticationPage;
