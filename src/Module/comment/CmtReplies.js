import React from "react";

const CmtReplies = ({ setShow }) => {
  return (
    <div className="flex ml-8 border-l-2 border-gray-800 p-3x">
      <input
        type="text"
        placeholder="Enter ..."
        className="font-semibold w-full flex-1 border-b-2 text-gray-400 border-gray-400  max-h-[100px] p-1x "
      />
      <button
        className="font-semibold text-white rounded-md p-1x bg-slate-600"
        onClick={() => setShow(null)}
      >
        cmt
      </button>
    </div>
  );
};

export default CmtReplies;
