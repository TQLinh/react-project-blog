import React from "react";
import Proptypes from "prop-types";
import { useController } from "react-hook-form";
const Input = ({ name, type = "text", className, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <input
      {...field}
      {...props}
      type={type}
      id={name}
      placeholder=" "
      className={`block w-full px-4 py-[15px] transition-all bg-white border-2 border-gray-300 rounded-lg input ${className}`}
    />
  );
};
Input.propTypes = {
  control: Proptypes.object,
  name: Proptypes.string,
  type: Proptypes.string,
  className: Proptypes.string,
};
export default Input;
