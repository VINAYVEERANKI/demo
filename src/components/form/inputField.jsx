import React from "react";
import "./inputFields.css";

const InputField = ({
  labelName,
  type,
  disabled = false,
  label = true,
  itemName,
  formikError,
  formikTouched,
  placeholder,
  inputValue,
  onChangeFn,
  onBlurFn,
  error,
  input = true,
  TextArea,
  inputDisabled = false,
}) => {
  return (
    <div className="row g-0 mt-3">
      <div className="col-4">
        {label && (
          <label
            htmlFor={itemName}
            className={
              (formikError && formikTouched) || error
                ? `red_color fs_16 fw_400 `
                : ` fs_16 fw_400 primary_color`
            }
          >
            {labelName}
          </label>
        )}
      </div>
      <div className="col-8">
        <div
          className={
            (formikError && formikTouched) || error
              ? `w-100  border_radius_5px document_input_error outline_none ps-2`
              : `w-100  border_radius_5px document_input outline_none ps-2 py-1`
          }
        >
          {input && (
            <>
              <input
                className={`w-100 border_none background_none outline_none coupon_placeholder_text`}
                type={type}
                id={itemName}
                placeholder={placeholder}
                name={itemName}
                disabled={disabled}
                value={inputValue}
                onChange={onChangeFn}
                onBlur={onBlurFn}
                
              />
            </>
          )}
          {TextArea && (
            <>
              <textarea
                className={
                  "w-100 border_none background_none outline_none ps-1 resize_none faq_discription_text_area coupon_placeholder_text"
                }
                placeholder={placeholder}
                id={itemName}
                name={itemName}
                value={inputValue}
                onChange={onChangeFn}
                onBlur={onBlurFn}
                disabled={disabled}
              ></textarea>
            </>
          )}
        </div>
        {formikTouched && formikError ? (
          <div className="ps-1 dark_red_color fs_14">{formikError}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
