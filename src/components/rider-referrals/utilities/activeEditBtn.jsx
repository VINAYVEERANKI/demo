import React from "react";

const ActiveEditBtn = ({ backButton = true, ActiveBackBtn = () => {} }) => {
  return (
    <div className="d-flex gap-4 justify-content-end mt-4">
      {backButton && (
        <button
          className="px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-1 align-item-center"
          type="button"
          onClick={ActiveBackBtn}
        >
          <i className="ri-arrow-left-line primary_color fw_600" />
          Go Back
        </button>
      )}
    </div>
  );
};

export default ActiveEditBtn;
