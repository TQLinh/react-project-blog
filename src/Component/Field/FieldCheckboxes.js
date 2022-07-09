import React from "react";

const FieldCheckboxes = ({ children, className, ...props }) => {
  return (
    <div
      className={`flex flex-col relative flex-wrap gap-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default FieldCheckboxes;
