import React from "react";
import { useDropdown } from "./dropdown-context";
import PropTypes from "prop-types";
const List = ({ children, className }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div
          className={`absolute left-0 w-full bg-white shadow-sm top-full h-[150px] overflow-auto ${className}`}
        >
          {children}
        </div>
      )}
    </>
  );
};
List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
export default List;
