import React from "react";

const ArrowUpIcon = ({
  fill = "rgba(165, 165, 165, 1)",
  width = 10,
  height = 16,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <path d="M12 8L18 14H6L12 8Z" fill={fill}></path>
    </svg>
  );
};

export default ArrowUpIcon;
