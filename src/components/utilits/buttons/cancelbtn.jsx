import React from "react";

const Cancelbtn = ({
  cancelFn,
  containerClassName = "fs_16 px-3 fw_500 border_radius_5px",
  // px-sm-4
  bg_color = "white_bg",
  is_border_color = "primary_border",
  is_icon = true,
  is_color = "primary_color",
  is_icon_color = "primary_color",
  button_title = "Cancel",
}) => {
  return (
    <>
      <button
        className={`${is_border_color} ${bg_color} ${containerClassName} d-flex align-items-center gap-2 ${is_color} py-1`}
        type="button"
        onClick={() => cancelFn()}
      >
        {is_icon && (
          <i className={`ri-close-circle-fill ${is_icon_color} fs_18`}></i>
        )}
        {button_title}
      </button>
    </>
  );
};

export default Cancelbtn;