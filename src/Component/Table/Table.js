import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-md">
      <table className="w-full">{children}</table>
    </div>
  );
};

export default Table;
