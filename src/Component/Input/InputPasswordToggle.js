import React, { useState } from "react";
import IconEye from "../Icon/IconEye";
import IconEyeClose from "../Icon/IconEyeClose";
import Label from "../Label/Label";

import Input from "./Input";

const InputPasswordToggle = ({
  control,
  value,
  nameLabel = "Password",
  ...props
}) => {
  const [togglePass, setTogglePass] = useState(false);
  if (!control) return null;
  return (
    <div>
      <Input
        {...props}
        name="password"
        type={togglePass ? "text" : "password"}
        placeholder=" "
        control={control}
      ></Input>
      <Label htmlFor="password">{nameLabel}</Label>
      <div className="absolute right-5 top-2/4 -translate-y-2/4">
        {!togglePass ? (
          <IconEyeClose
            className="input-icon"
            onClick={() => setTogglePass(!togglePass)}
          ></IconEyeClose>
        ) : (
          <IconEye
            className="input-icon"
            onClick={() => setTogglePass(!togglePass)}
          ></IconEye>
        )}
      </div>
    </div>
  );
};

export default InputPasswordToggle;
