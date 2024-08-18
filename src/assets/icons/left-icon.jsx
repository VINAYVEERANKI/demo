import React from "react";

const LeftIcon = ({ fill = "#bcc7ce", width = 10, height = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        id="Icon_material-keyboard-arrow-left"
        data-name="Icon material-keyboard-arrow-left"
        d="M19,18.254l-4.327-4.336L19,9.582,17.668,8.25,12,13.918l5.668,5.668Z"
        // transform="translate(-12 -8.25)"
        fill={fill}
      />
    </svg>
  );
};

export default LeftIcon;
