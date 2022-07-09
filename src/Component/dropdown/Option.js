import React, { useEffect } from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="flex items-center justify-between px-5 py-4 h-[50px] transition-all rounded-sm cursor-pointer bg-slate-300 hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
