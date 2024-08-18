import React from "react";
import SpinnerLoading from "../spinnerLoading";

const Proceedbtn = ({
  submitFn,
  loading,
  button_title = "Proceed",
  disabled = false,
}) => {
  return (
    <>
      <button
        type="submit"
        className={`${disabled ? "disabled_color_bg":"primary_bg"}  border_radius_5px px-4 py-1 border_none`}
        onClick={() => submitFn()}
        disabled={disabled}
      >
        <span className=" fs_18 white_color px-3">
          {loading ? <SpinnerLoading /> : `${button_title}`}{" "}
        </span>
      </button>
    </>
  );
};

export default Proceedbtn;
