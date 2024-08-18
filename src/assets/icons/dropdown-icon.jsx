import React from "react";

const DropDownIcon = ({
  fill = "rgba(51,51,51,1)",
  width =34,
  height = 34,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 14l-4-4h8z" fill={fill} />
    </svg>
  );
};

export default DropDownIcon;
