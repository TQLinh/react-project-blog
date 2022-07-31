import React from "react";
import Button from "../Button/Button";

const NoAccess = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[500px] w-[700px]">
        <img className="h-full" alt="" srcSet="/noAccess.jpg" />
      </div>
      <Button className="!max-w-max" to="/">
        Go to back home
      </Button>
    </div>
  );
};

export default NoAccess;
