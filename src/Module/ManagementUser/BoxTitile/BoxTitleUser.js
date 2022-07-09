import React from "react";
import PropTypes from "prop-types";
const BoxTitleUser = (props) => {
  const { className = "", children } = props;
  return (
    <div className={`flex items-center p-1 gap-x-2  ${className}`}>
      {children}
    </div>
  );
};
BoxTitleUser.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
export default BoxTitleUser;
