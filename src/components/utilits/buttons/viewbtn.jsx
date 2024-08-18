import React from "react";
import SpinnerLoading from "../spinnerLoading";

const Viewbtn = ({ viewfn, loading }) => {
  return (
    <button
      className="border_none border_radius_5px fs_13 me-4 fw_500 px-3 white_color blue_color_bg"
      onClick={() => {
        viewfn();
      }}
    >
      {loading ? <SpinnerLoading /> : "View"}
    </button>
  );
};

export default Viewbtn;
