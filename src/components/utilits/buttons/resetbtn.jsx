import React from "react";

const Resetbtn = ({ onResetFn }) => {
  return (
    <>
      <button
        className="body_bg border_none py-1 px-sm-4 px-2 border_radius_5px fw_600 d-flex align-items-center gap-2"
        type="button"
        onClick={() => {
          onResetFn()
        }}
      >
        <i className="ri-restart-line fw_500"></i> RESET
      </button>
    </>
  );
};

export default Resetbtn;
