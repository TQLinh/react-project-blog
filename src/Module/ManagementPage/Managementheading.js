import React from "react";
import PropTypes from "prop-types";
const Managementheading = ({ children, title = "", desc = "" }) => {
  return (
    <div className="flex items-center justify-between mt-2 mb-4">
      <div>
        <h1 className="text-3xl font-black text-sky-600 dashboard-heading logo">
          {title}
        </h1>
        <p className="text-sm font-semibold text-sky-700 dashboard-short-desc">
          {desc}
        </p>
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
