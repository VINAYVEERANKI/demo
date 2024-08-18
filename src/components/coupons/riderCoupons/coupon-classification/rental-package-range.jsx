import React from "react";
import CouponSelectField from "../../../form/CouponSelectField";

const RentalPackageRange = ({ formik, editCondition }) => {
  const R_P_range_start = [
    { value: "1", label: "1 Hrs" },
    { value: "2", label: "2 Hrs" },
    { value: "3", label: "3 Hrs" },
    { value: "4", label: "4 Hrs" },
    { value: "5", label: "5 Hrs" },
    { value: "6", label: "6 Hrs" },
    { value: "7", label: "7 Hrs" },
    { value: "8", label: "8 Hrs" },
    { value: "9", label: "9 Hrs" },
    { value: "10", label: "10 Hrs" },
  ];

  return (
    <div className="mt-1 mb-2">
      <span className=" primary_color fs_16 fw_500">
        Coupon Classification*
      </span>
      <br />
      <label className="mt-2 fs_14 primary_color">Rental Package-Range*</label>
      <div className="row mt-2 align-items-center justify-content-between">
        <div className="col-6">
          <CouponSelectField
            labelName="Start"
            placeholder="Select start"
            option={R_P_range_start}
            itemName="R_P_range_start"
            formikValue={formik.values.R_P_range_start}
            formik={formik}
            formikError={formik.errors.R_P_range_start}
            formikTouched={formik.touched.R_P_range_start}
            selectDisabled={editCondition}
          />
        </div>
        <div className="col-6">
          <CouponSelectField
            labelName="End"
            placeholder="Select end"
            option={R_P_range_start}
            itemName="R_P_range_end"
            formikValue={formik.values.R_P_range_end}
            formik={formik}
            formikError={formik.errors.R_P_range_end}
            formikTouched={formik.touched.R_P_range_end}
            selectDisabled={editCondition}
          />
        </div>
      </div>
    </div>
  );
};

export default RentalPackageRange;
