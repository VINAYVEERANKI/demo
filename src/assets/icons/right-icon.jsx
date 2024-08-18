import React from "react";

const RightIcon = ({ fill = "#bcc7ce", width = 10, height = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
        fill={fill}
      />
    </svg>
  );
};

export default RightIcon;