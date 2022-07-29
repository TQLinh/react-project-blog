import React from "react";

const LoginWithFB = () => {
  return (
    <div className="flex items-center justify-center border border-gray-600 rounded-lg cursor-pointer gap-x-2 py-1x px-2x">
      <div className="w-6 h-6">
        <img alt="" srcSet="/iconfb.png 2x" />
      </div>
      <span className="text-sm font-semibold">Sign up with Facebook</span>
    </div>
  );
};

export default LoginWithFB;
