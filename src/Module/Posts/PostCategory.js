import React from "react";
import { Link } from "react-router-dom";

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  to = "/",
}) => {
  return (
    <div
      className={`inline-block px-2 py-1 rounded-md text-gray-600 text-sm font-semibold bg-[#d7d7d7] whitespace-nowrap ${className}`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default PostCategory;
