import React from "react";
import { useController } from "react-hook-form";

const Textarea = ({
  name,
  className,
  placeholder = "enter playholder...",
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      {...field}
      {...props}
      id={name}
      className={`px-1 py-2 border-2 min-h-[100px] max-h-[200px] border-gray-300 rounded-lg mt-1x ${className}`}
      name={name}
      placeholder={placeholder}
      cols="30"
      rows="10"
    ></textarea>
  );
};

export default Textarea;
