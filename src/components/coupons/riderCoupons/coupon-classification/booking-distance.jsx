import React from "react";
import CouponInputField from "../../../form/couponInputField";

const BookingDistance = ({ formik, editCondition }) => {
  return (
    <div className="mt-1 mb-2">
      <span className=" primary_color fs_16 fw_500">
        Coupon Classification*
      </span>
      <div className="row mt-2">
        <div className="col-6">
          <CouponInputField
            labelName="Booking Distance-Milestone (Km)*"
            itemName={"bookingDistanceMilestone"}
            inputValue={formik.values.bookingDistanceMilestone}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.bookingDistanceMilestone}
            formikTouched={formik.touched.bookingDistanceMilestone}
            placeholder="Booking Distance-Milestone (Km)"
            inputDisabled={editCondition}
          />
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default BookingDistance;
