import React from "react";
import { useNavigate } from "react-router-dom";
import IconArrow from "../../Component/Icon/IconArrow";

const UserTitle = ({ data }) => {
  const navigate = useNavigate();
  const handleRole = (role) => {
    switch (role) {
      case 1:
        return <div className="text-blue-600">Member</div>;
      case 3:
        return <div className="text-purple-600">Admin</div>;
      default:
        break;
    }
  };
  if (!data) return;
  return (
    <div className="flex flex-col justify-center cursor-pointer post">
      <div className="overflow-hidden rounded-sm h-[250px] w-full img-post">
        <img
          className="h-full scale-100 transition-all hover:opacity-60 hover:scale-[1.2]"
          src={data.avatar}
          alt="ảnh đại diện"
        />
      </div>
      <div className="flex flex-col justify-between p-1 mt-2 text-black px-1x information gap-y-2">
        <div className="text-black">
          <div className="flex items-center justify-between">
            <span className="capitalize fullname"> {data.fullname}</span>
            <span className="flex items-center font-semibold gap-x-1">
              Role: {handleRole(Number(data.role))}
            </span>
          </div>
          <div className="flex items-center text-base font-semibold py-1x email gap-x-1">
            <span>Email:</span> <span>{data.email}</span>
          </div>
          <div className="text-base font-semibold post-type">
            Post Type: Du lịch VN
          </div>
        </div>
        <div>
          <div onClick={() => navigate(`/postUser/?id=${data.id}`)}>
            <button className="flex items-center text-sm font-semibold transition-all rounded-md px-3x gap-x-2 py-1x hover:translate-x-3x text-sky-600 bg-slate-800">
              <p> Show Post</p> <IconArrow></IconArrow>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTitle;
