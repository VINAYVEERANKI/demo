import React from "react";
import "./NSEButtons.css";

const NSEButtons = ({
  resetBtn = () => {},
  backBtn = () => {},
  updateBtn = () => {},
  disabled,
}) => {
  return (
    <>
      <div className="d-lg-block d-none">
        <div className="d-flex gap-4 justify-content-md-end mt-5 text-nowrap">
          <button
            className="px-5 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center border_solid-primary"
            type="button"
            onClick={resetBtn}
          >
            Reset Changes
          </button>
          <button
            className="fs_18 fw_500 background_none error_border primary_border red_color border_radius_3px px-5 py-1 border_solid"
            type="button"
            onClick={backBtn}
          >
            Cancel
          </button>
          <button
            className={`${
              disabled ? "light_grey_bg" : "light_green_bg"
            } border_none border_radius_3px white_color fs_18 px-5`}
            type="submit"
            onClick={updateBtn}
            disabled={disabled}
          >
            Update
          </button>
        </div>
      </div>
      <div className="d-block d-lg-none text-center align-items-center">
        <div className="row d-flex justify-content-center g-0 mt-5 text-nowrap">
          <div className="col-lg-3 col-md-4 col-sm-4 mb-3">
            <button
              className="px-md-4 px-3 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 border_solid-primary"
              type="button"
              onClick={resetBtn}
            >
              Reset Changes
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 mb-3">
            <button
              className="fs_18 fw_500 background_none error_border primary_border red_color border_radius_3px px-5 py-1 border_solid"
              type="button"
              onClick={backBtn}
            >
              Cancel
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 mb-3">
            <button
              className={`${
                disabled ? "light_grey_bg" : "light_green_bg"
              } border_none border_radius_3px white_color fs_18 px-5 py-1`}
              type="submit"
              onClick={updateBtn}
              disabled={disabled}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NSEButtons;
