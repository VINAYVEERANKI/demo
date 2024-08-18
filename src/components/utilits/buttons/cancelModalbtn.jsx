import React from "react";

const CancelModalbtn = ({ cancelModalFn }) => {
  return (
    <>
      <button
        onClick={() => {
          cancelModalFn();
        }}
        className={`white_color border_none px-4 py-1 primary_bg border_radius_5px`}
        type="button"
      >
        <span className="d-flex align-items-center gap-2 fs_18">
          <i className="ri-close-circle-line "></i>
          <span>Cancel </span>
        </span>
      </button>
    </>
  );
};

export default CancelModalbtn;
