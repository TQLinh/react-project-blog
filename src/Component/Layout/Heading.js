import React from "react";

const Heading = ({ className = "", children }) => {
  return (
    <div
      className={`heading text-blue-500 text-3xl absolute mb-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Heading;
