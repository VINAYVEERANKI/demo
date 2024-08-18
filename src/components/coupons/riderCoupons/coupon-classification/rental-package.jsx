import React from "react";

import CouponSelectField from "../../../form/CouponSelectField";

const RentalPackage = ({ formik, editCondition }) => {
  const rentalPackageMilestone = [
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
      <div className="row mt-2">
        <div className="col-6">
          <CouponSelectField
            labelName="Rental Package-Milestone*"
            placeholder="Select Refund Type"
            option={rentalPackageMilestone}
            itemName="rentalPackageMilestone"
            formikValue={formik.values.rentalPackageMilestone}
            formik={formik}
            formikError={formik.errors.rentalPackageMilestone}
            formikTouched={formik.touched.rentalPackageMilestone}
            selectDisabled={editCondition}
          />
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default RentalPackage;
