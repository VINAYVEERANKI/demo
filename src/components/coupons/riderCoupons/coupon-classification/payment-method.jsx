import React from "react";

import CouponSelectField from "../../../form/CouponSelectField";

const PaymentMethod = ({ formik, editCondition }) => {
  const paymentMethod = [
    { value: "Online", label: "Online" },
    { value: "Cash", label: "Cash" },
  ];

  return (
    <div className="mt-1 mb-2">
      <span className=" primary_color fs_16 fw_500">
        Coupon Classification*
      </span>
      <div className="row">
        <div className="col-6">
          <CouponSelectField
            labelName="Payment Method*"
            placeholder="Select Payment Method"
            option={paymentMethod}
            itemName="paymentMethod"
            formikValue={formik.values.paymentMethod}
            formik={formik}
            formikError={formik.errors.paymentMethod}
            formikTouched={formik.touched.paymentMethod}
            selectDisabled={editCondition}
          />
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default PaymentMethod;
