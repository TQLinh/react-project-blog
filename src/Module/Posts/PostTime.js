import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const PostTime = ({
  date = "20/09/2001",
  authorName = "Trần Linh",
  to = "/",
  className = "",
}) => {
  return (
    <div
      className={`inline-block items-center  text-sm font-semibold text-white ${className}`}
    >
      <span className="post_time">{date}</span>
      <span className="inline-block w-1 h-1 mx-2 bg-white rounded-full post-dot"></span>
      <Link to={to}>
        <span className="post-author">{authorName}</span>
      </Link>
    </div>
  );
};

PostTime.propTypes = {
  className: PropTypes.string,
  data: PropTypes.string,
  authorName: PropTypes.string,
  to: PropTypes.string,
};
export default PostTime;
