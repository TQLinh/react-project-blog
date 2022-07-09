import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const PostTitle = ({ children, className = "", to = "/" }) => {
  return (
    <div
      className={`font-semibold leading-normal tracking-[0.25px] text-white ${className}`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
};
PostTitle.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
};
export default PostTitle;
