import React from "react";
import CouponInputField from "../../form/couponInputField";

const MessageInput = ({ formik,couponData }) => {
  return (
    <div className="ps-4 mt-1">
      <CouponInputField
        label_font_size="fs_16"
        labelName="Message Header*"
        itemName={"messageHeader"}
        inputValue={formik.values.messageHeader}
        onChangeFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        formikError={formik.errors.messageHeader}
        formikTouched={formik.touched.messageHeader}
        placeholder="Enter Message Header"
        inputDisabled={couponData?.edit === false ? true : false}
      />
      <div className="mt-1">
        <CouponInputField
          label_font_size="fs_16"
          labelName="Message Body1*"
          itemName={"messageBody"}
          inputValue={formik.values.messageBody}
          onChangeFn={formik.handleChange}
          onBlurFn={formik.handleBlur}
          formikError={formik.errors.messageBody}
          formikTouched={formik.touched.messageBody}
          placeholder="Enter Message "
          TextArea={true}
          input={false}
          inputDisabled={couponData?.edit === false ? true : false}
        />
      </div>
    </div>
  );
};

export default MessageInput;
