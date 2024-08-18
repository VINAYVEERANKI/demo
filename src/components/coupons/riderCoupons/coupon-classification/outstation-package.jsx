import React from "react";
import CouponInputField from "../../../form/couponInputField";

const OutstationPackage = ({ formik, editCondition }) => {
  return (
    <div className="mt-1 mb-2">
      <span className=" primary_color fs_16 fw_500">
        Coupon Classification*
      </span>
      <div className="row mt-2">
        <div className="col-6">
          <CouponInputField
            labelName="Outstation Package Duration-Milestone (Km)*"
            itemName={"outstationPackageMilestone"}
            inputValue={formik.values.outstationPackageMilestone}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.outstationPackageMilestone}
            formikTouched={formik.touched.outstationPackageMilestone}
            placeholder="Outstation Package Duration-Milestone (Km)"
            inputDisabled={editCondition}
          />
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
};
export default OutstationPackage;
