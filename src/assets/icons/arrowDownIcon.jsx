import React from "react";

const ArrowDownIcon = ({
  fill = "rgba(165, 165, 165, 1)",
  width = 10,
  height = 16,
  className
  
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
    >
      <path d="M12 16L6 10H18L12 16Z" fill={fill}></path>
    </svg>
  );
};

export default ArrowDownIcon;
