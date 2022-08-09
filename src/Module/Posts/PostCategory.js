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
      className={`inline-block px-2 py-1 rounded-md text-sky-300 text-sm font-semibold bg-sky-900 whitespace-nowrap ${className}`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default PostCategory;
