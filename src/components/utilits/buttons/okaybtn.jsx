import React from "react";
import OkayCheckBoxIcon from "../../../assets/icons/okayCheck-icon.svg";

const Okaybtn = ({
  okayFn = () => {},
  okay = "OKAY",
  iconShow = true,
  btnType = "button",
  className = "",
}) => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="UpdatePricingSuccessOkay_btn  primary_bg border_radius_5px px-4 py-1 mt-2 mb-2 border_none"
        onClick={() => okayFn()}
        type={btnType}
      >
        <div className="d-flex justify-content-center align-items-center px-3">
          {iconShow ? (
            <img src={OkayCheckBoxIcon} width={20} height={20} />
          ) : (
            <></>
          )}

          <span className={`fs_18 white_color ps-2 fw_500 ${className}`}>{okay}</span>
        </div>
      </button>
    </div>
  );
};

export default Okaybtn;
