import React from "react";
import { useNavigate } from "react-router-dom";

const UserTitle = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return;
  return (
    <div className="flex items-center justify-center cursor-pointer post">
      <div className="img-post w-[150px] h-[150px] rounded-full overflow-hidden">
        <img className="h-full" src={data.avatar} alt="ảnh đại diện" />
      </div>
      <div className="flex flex-col justify-between p-1 ml-2 information gap-y-2">
        <div>
          <div className="fullname">{data.fullname}</div>
          <div className="flex items-center email gap-x-1">
            <span>Email:</span> <span>{data.email}</span>
          </div>
          <div className="post-type">Post Type: Du lịch VN</div>
        </div>
        <div>
          <div onClick={() => navigate(`/postUser/?id=${data.id}`)}>
            <button className="px-3 py-1 text-xs font-semibold text-white rounded-md bg-[#101734]">
              Show post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTitle;
