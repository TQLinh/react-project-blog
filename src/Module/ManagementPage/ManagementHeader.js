import React from "react";
import Button from "../../Component/Button/Button";
import PropTypes from "prop-types";
import { useAuth } from "../../Contexts/auth-context";
import { useNavigate } from "react-router-dom";
const ManagementHeader = ({ children, className = "" }) => {
  const { userInfo } = useAuth();
  const { avatar, email } = userInfo;
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/");
  };
  return (
    <div
      className={`flex items-center justify-between gap-3 p-2 h-[100px] bg-white shadow-xl ${className}`}
    >
      <div
        className="flex items-center cursor-pointer sidebar-logo gap-x-2"
        onClick={handleBackHome}
      >
        <div className="w-5x h-5x">
          <img srcSet="/iconb.ico" alt="" />
        </div>
        <span className="text-3xl font-bold sidebar-name logo">
          Perspnal-post
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          to="/accountManagement/user"
          type="button"
          className={"header_button text-xl"}
        >
          {children}
        </Button>
        <div className="header-avatar w-[50px] h-[50px] overflow-hidden rounded-full">
          <img className="h-full" src={avatar} alt="" title={email} />
        </div>
      </div>
    </div>
  );
};

ManagementHeader.propTypes = {
  children: PropTypes.string || PropTypes.object,
  className: PropTypes.string,
};
export default ManagementHeader;
