import React from "react";

const ImageNotProduct = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <img className="h-full" alt="" srcSet="/notProduct.png" />
    </div>
  );
};

export default ImageNotProduct;
