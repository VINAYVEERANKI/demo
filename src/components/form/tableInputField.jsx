import React from "react";
import CheckBox from "../../assets/icons/green-checkbox-icon.svg";

const TableInputField = ({
  itemName,
  title,
  placeholder = "Enter details",
  inputValue,
  onChangeFn,
  onBlurFn,
  type = "text",
  formikError,
  formikTouched,
  verified = false,
  inputContainer = "row mt-1",
  inputField = true,
  value,
}) => {
  return (
    <>
      {inputField ? (
        <div className={`${inputContainer}`}>
          <div className="col-lg-5 col-6">
            <span
              className={
                formikError && formikTouched
                  ? "red_color fs_13 fw_500 "
                  : "disabled_color fs_13 fw_500 "
              }
            >
              {title}
            </span>
          </div>

          <div className="col-lg-7 col-6">
            <input
              placeholder={placeholder}
              className={
                formikError && formikTouched
                  ? "error_border w_60 border_radius_3px outline_none fs_13 ps-1 primary_color fw_500"
                  : "w_60   registration_input border_radius_3px outline_none fs_13 ps-1 primary_color fw_500"
              }
              type={type}
              name={itemName}
              value={inputValue}
              onChange={onChangeFn}
              onBlur={onBlurFn}
            />
            {verified ? (
              <span className="">
                <img src={CheckBox} className="green_checkbox_icon" alt="icon" />
                <span className="fs_10 align-items-center green_color ps-1 fw_600">
                  Verified
                </span>
              </span>
            ) : null}
            {formikError && formikTouched && (
              <div className="dark_red_color fs_13">{formikError}</div>
            )}
          </div>
        </div>
      ) : (
        <div className={`${inputContainer}`}>
          <div className="col-lg-5 col-6">
            <span className="disabled_color fs_13 fw_500">{title}</span>
          </div>
          <div className="col-lg-7 col-6">
            <span className="primary_color  fs_13 fw_500">{value}</span>
            {verified ? (
              <span className="">
                <img src={CheckBox} className="green_checkbox_icon" alt="icon" />
                <span className="fs_10 align-items-center green_color ps-1 fw_600">
                  Verified
                </span>
              </span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default TableInputField;
