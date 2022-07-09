import React from "react";
import PropTypes from "prop-types";
const Managementheading = ({ children, title = "", desc = "" }) => {
  return (
    <div className="flex items-start justify-between mb-4 ">
      <div>
        <h1 className="text-3xl font-black text-pink-400 dashboard-heading">
          {title}
        </h1>
        <p className="text-sm text-red-300 dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
};
Managementheading.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string,
  desc: PropTypes.string,
};
export default Managementheading;
