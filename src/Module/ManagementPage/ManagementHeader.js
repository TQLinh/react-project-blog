import React from "react";
import Button from "../../Component/Button/Button";
import PropTypes from "prop-types";
import { useAuth } from "../../Contexts/auth-context";
const ManagementHeader = ({ children, className = "" }) => {
  const { userInfo } = useAuth();
  // console.log(userInfo);
  const { avatar, email } = userInfo;
  console.log("avatar: ", avatar);
  return (
    <div
      className={`flex items-center justify-end gap-3 p-2 h-[100px] bg-white shadow-xl ${className}`}
    >
      <Button to="/" type="button" className={"header_button text-xl"}>
        {children}
      </Button>
      <div className="header-avatar w-[50px] h-[50px] overflow-hidden rounded-full">
        <img className="h-full" src={avatar} alt="" title={email} />
      </div>
    </div>
  );
};

ManagementHeader.propTypes = {
  children: PropTypes.string || PropTypes.object,
  className: PropTypes.string,
};
export default ManagementHeader;
