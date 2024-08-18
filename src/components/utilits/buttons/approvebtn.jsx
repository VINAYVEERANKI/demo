import React from "react";

const Approvebtn = ({ approvefn }) => {
  return (
    <button
      onClick={() => approvefn()}
      className="border_radius_5px white_color border_none fs_16 px-4 light_green_bg py-1 fs_14"
      type="submit"
    >
      Approve
    </button>
  );
};

export default Approvebtn;
