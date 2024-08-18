import React from "react";
import SpinnerLoading from "../../utilits/spinnerLoading";

const CreateBroadcastBtn = ({
  navigateBtn = () => {},
  submitBtn = () => {},
  cancelBtn = false,
  backBtn = false,
  btnText = "",
  loading = false,
}) => {
  return (
    <div>
      <div className="d-flex gap-4 justify-content-end mt-4">
      {backBtn && (
          <button
            className="px-5 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
            type="button"
            onClick={navigateBtn}
          >
            <i className="ri-arrow-left-line primary_color fw_600" />
            Go Back
          </button>
        )}
        {cancelBtn && (
          <button
            className="px-5 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
            type="button"
            onClick={navigateBtn}
          >
            <i className="ri-close-circle-fill primary_color" />
            Cancel
          </button>
        )}

        

        <button
          className="px-5 py-1 primary_bg primary_border white_color border_radius_3px fs_18"
          type="submit"
          onClick={submitBtn}
          disabled={loading}
        >
          {loading ? <SpinnerLoading /> : btnText}
        </button>
      </div>
    </div>
  );
};

export default CreateBroadcastBtn;
