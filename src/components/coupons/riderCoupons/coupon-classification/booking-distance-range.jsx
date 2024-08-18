import React from "react";
import CouponMuiField from "../../../form/couponMuiField";

const BookingDistanceRange = ({ formik, editCondition }) => {
  return (
    <div className="mt-1 mb-2">
      <span className=" primary_color fs_16 fw_500">
        Coupon Classification*
      </span>
      <br />
      <label className="mt-2 fs_14 primary_color">
        Booking Distance-Range (Km)*
      </label>
      <div className="d-flex mt-2 align-items-center justify-content-between">
        <CouponMuiField
          label={"Start"}
          itemName={"B_D_range_start"}
          style_width="48.6%"
          itemValue={formik.values.B_D_range_start}
          onChangeFn={formik.handleChange}
          onBlurFn={formik.handleBlur}
          formikError={formik.errors.B_D_range_start}
          formikTouched={formik.touched.B_D_range_start}
          autoFocus={false}
          disabled={editCondition}
        />
        <span>-</span>
        <CouponMuiField
          label={"End"}
          itemName={"B_D_range_end"}
          style_width="48.6%"
          itemValue={formik.values.B_D_range_end}
          onChangeFn={formik.handleChange}
          onBlurFn={formik.handleBlur}
          formikError={formik.errors.B_D_range_end}
          formikTouched={formik.touched.B_D_range_end}
          autoFocus={false}
          disabled={editCondition}
        />
      </div>
    </div>
  );
};

export default BookingDistanceRange;
