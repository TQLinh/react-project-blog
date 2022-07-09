import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Loading/LoadingSpinner";
import PropTypes from "prop-types";
const Button = ({
  type = "button",
  children,
  onClick = () => {},
  className,
  to = "",
  ...Rest
}) => {
  const { isloading } = Rest;
  const child = !!isloading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to == "string") {
    return (
      <Link to={to}>
        <button
          {...Rest}
          type={type}
          className={` bg-gradient-to-br from-[#C3EC5C] to-[#E342F5] px-6 rounded-lg  py-2 text-white ${className}`}
        >
          {child}
        </button>
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      {...Rest}
      type={type}
      className={`button flex items-center justify-center w-full gap-1 p-4 mx-auto mt-3 font-semibold text-white rounded-sm bg-black ${className}`}
    >
      {child}
    </button>
  );
};

Button.propTypes = {
  // type: PropTypes.oneOf[("button", "submit")].is,
  isloading: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
export default Button;
