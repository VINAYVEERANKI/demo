import React from "react";
import "../../components/form/inputFields.css";

const CouponInputField = ({
  label_font_size = "fs_16 fw_400",
  labelName,
  itemName,
  formikError,
  formikTouched,
  placeholder,
  inputValue,
  onChangeFn,
  onBlurFn,
  error,
  percentSign,
  ruppeSymbol,
  input = true,
  TextArea,
  inputDisabled = false,
  inputClassName,
  label = true,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={itemName}
          className={
            (formikError && formikTouched) || error
              ? `red_color ${label_font_size} `
              : ` ${label_font_size} primary_color`
          }
        >
          {labelName}
        </label>
      )}
      <div
        className={
          (formikError && formikTouched) || error
            ? ` w-100 border_radius_3px error_border outline_none position-relative`
            : `${
                inputDisabled === true
                  ? "disabled_border disabled_bg_color"
                  : "primary_border"
              } w-100 border_radius_3px  outline_none position-relative`
        }
      >
        {input && (
          <>
            {ruppeSymbol && (
              <span className="fs_14 primary_color ruppe_icon fw_500">₹</span>
            )}
            <input
              name={itemName}
              className={`w-100  border_none background_none outline_none coupon_placeholder_text ${inputClassName} ${
                ruppeSymbol === true ? "ps-4" : "ps-2"
              } p-1`}
              id={itemName}
              placeholder={placeholder}
              value={inputValue}
              onChange={onChangeFn}
              onBlur={onBlurFn}
              disabled={inputDisabled}
            />
            {percentSign && <i className="ri-percent-line ps-1 percent_icon" />}
          </>
        )}
        {TextArea && (
          <>
            <textarea
              className={
                "w-100 border_none background_none outline_none  ps-2 resize_none coupon_discription_text_area coupon_placeholder_text"
              }
              placeholder={placeholder}
              id={itemName}
              name={itemName}
              value={inputValue}
              onChange={onChangeFn}
              onBlur={onBlurFn}
              disabled={inputDisabled}
            ></textarea>
          </>
        )}
      </div>
    </>
  );
};

export default CouponInputField;
