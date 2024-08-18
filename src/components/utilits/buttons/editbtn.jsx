import React from "react";

const Editbtn = ({ editFn }) => {
  return (
    <button
      className="border_none primary_bg border_radius_5px fs_14 fw_500 white_color ms-3 px-3"
      onClick={() => {
        editFn();
      }}
    >
      Edit
    </button>
  );
};

export default Editbtn;
