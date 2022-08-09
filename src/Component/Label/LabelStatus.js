import React from "react";
import PropTypes from "prop-types";

const LabelStatus = ({ children, type = "" }) => {
  let styleClassName = "text-gray-500 bg-gray-500";
  switch (type) {
    case "success":
      styleClassName = "bg-sky-900";
      break;
    case "warning":
      styleClassName = "bg-orange-700";
      break;
    case "danger":
      styleClassName = "bg-red-700";
      break;

    default:
      break;
  }
  return (
    <span
      className={`inline-block py-2 px-4 rounded-md text-sky-100 text-sm font-bold ${styleClassName}`}
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
