import React from "react";
import { useNavigate } from "react-router";

const BookingInnerLayout = ({
  children,
  title = "",
  navigateEnable = true,
}) => {
  const navigate = useNavigate();
  return (
    <div className="default_fare_container mt-4 mx-lg-3 mx-md-0 mx-sm-0 mb-5">
      <div className="d-flex justify-content-between align-items-center primary_bg py-2 trip_detail_id_container">
        {navigateEnable ? (
          <button
            className="border_none background_none"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="ri-arrow-left-s-line fs_23 fw_700 white_color"></i>
          </button>
        ) : (
          <></>
        )}

        <span className="text-end fs_20 fw_600 white_color">{title}</span>
        <span></span>
      </div>
      {children}
    </div>
  );
};

export default BookingInnerLayout;
