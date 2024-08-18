import React from "react";
import CouponMuiField from "../../../form/couponMuiField";
import {
  couponDisabledStyles,
  couponStyles,
} from "../../../mui-styles/mui-styles";

const OutstationPackageRange = ({ formik, editCondition }) => {
  return (
    <div className="mt-1 mb-2">
      <span className=" primary_color fs_16 fw_500">
        Coupon Classification*
      </span>
      <br />
      <label className="mt-2 fs_14 primary_color">
        Outstation Package Duration-Range (Days)*
      </label>
      <div className="d-flex mt-2 align-items-center justify-content-between">
        <CouponMuiField
          label={"Start"}
          styles={
            editCondition ? couponDisabledStyles.select : couponStyles.select
          }
          itemName={"O_P_D_range_start"}
          style_width="48.6%"
          itemValue={formik.values.O_P_D_range_start}
          onChangeFn={formik.handleChange}
          onBlurFn={formik.handleBlur}
          formikError={formik.errors.O_P_D_range_start}
          formikTouched={formik.touched.O_P_D_range_start}
          autoFocus={false}
          disabled={editCondition}
        />
        <span>-</span>
        <CouponMuiField
          label={"End (Max : 7 days)"}
          styles={
            editCondition ? couponDisabledStyles.select : couponStyles.select
          }
          itemName={"O_P_D_range_end"}
          style_width="48.6%"
          itemValue={formik.values.O_P_D_range_end}
          onChangeFn={formik.handleChange}
          onBlurFn={formik.handleBlur}
          formikError={formik.errors.O_P_D_range_end}
          formikTouched={formik.touched.O_P_D_range_end}
          autoFocus={false}
          disabled={editCondition ? true : false}
        />
      </div>
    </div>
  );
};

export default OutstationPackageRange;
