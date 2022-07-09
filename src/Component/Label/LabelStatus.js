import React from "react";
import PropTypes from "prop-types";

const LabelStatus = ({ children, type = "" }) => {
  let styleClassName = "text-gray-500 bg-gray-500";
  switch (type) {
    case "success":
      styleClassName = "text-green-500 bg-green-500";
      break;
    case "warning":
      styleClassName = "text-orange-500 bg-orange-500";
      break;
    case "danger":
      styleClassName = "text-red-500 bg-red-100";
      break;

    default:
      break;
  }
  return (
    <span
      className={`inline-block py-2 px-4 rounded-lg text-sm font-medium${styleClassName}`}
    >
      {children}
    </span>
  );
};
LabelStatus.propTypes = {
  children: PropTypes.string,
  type: PropTypes.oneOf(["success", "warning", "danger"]).isRequired,
};
export default LabelStatus;
