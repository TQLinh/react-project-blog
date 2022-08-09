import React from "react";

const UpToTop = () => {
  const handleUp = () => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div
      onClick={() => handleUp()}
      className="fixed z-50 p-2 transition-all border-2 rounded border-sky-800 text-sky-800 right-5 bottom-5 hover:bg-sky-800 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </div>
  );
};

export default UpToTop;
