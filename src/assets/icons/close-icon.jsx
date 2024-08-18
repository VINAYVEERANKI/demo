import React from "react";

const CloseIcon = ({
  fill = "#bcc7ce",
  width = 10,
  height = 16,
  className,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15.281 15.281"
    >
      <path
        id="Icon_material-close"
        data-name="Icon material-close"
        d="M22.781,9.039,21.242,7.5l-6.1,6.1-6.1-6.1L7.5,9.039l6.1,6.1-6.1,6.1,1.539,1.539,6.1-6.1,6.1,6.1,1.539-1.539-6.1-6.1Z"
        transform="translate(-7.5 -7.5)"
        fill={fill}
      />
    </svg>
  );
};

export default CloseIcon;
