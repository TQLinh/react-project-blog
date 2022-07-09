import React from "react";
import PropTypes from "prop-types";
const Label = ({ htmlFor, children, className, ...props }) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={`absolute select-none inline-block label tracking-[1px] ${className}`}
    >
      {children}
    </label>
  );
};
Label.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
};
export default Label;
