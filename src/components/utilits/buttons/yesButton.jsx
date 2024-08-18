import React from "react";
import { useNavigate } from "react-router";

const YesButton = ({ okayFn, okay = "Yes", link }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center">
      <button
        className="UpdatePricingSuccessOkay_btn  primary_bg border_radius_5px px-4 py-1 mt-2 mb-2 border_none"
        onClick={() => {
          navigate(link);
          okayFn();
        }}
        type="button"
      >
        <span className=" fs_18 white_color fw_500 px-4">{okay}</span>
      </button>
    </div>
  );
};

export default YesButton;
