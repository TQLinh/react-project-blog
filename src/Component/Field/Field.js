import React from "react";

const Field = ({ children, className }) => {
  return <div className={`relative  ${className}`}>{children}</div>;
};

export default Field;
