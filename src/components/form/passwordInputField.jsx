import React, { useState } from "react";
import eyeOn from "../../assets/icons/eye-on.svg";
import eyeOff from "../../assets/icons/eye-off.svg";

const PasswordInputField = ({
  error,
  itemName,
  title = "Please enter  your password to confirm ",
  placeholder = "Please enter your password",
  inputValue,
  onChangeFn,
  onBlurFn,
  formikError,
  formikTouched,
  reasonTitle,
  reasonPlaceHolder = "Please enter your reason",
  reasonItemName,
  onReasonChangeFn,
  onReasonBlurFn,
  reasonItemValue,
  formikReasonError,
  formikReasonTouched,
  inputContainer = "px-sm-5",
  reason = false,
  is_reasonError = true,
  is_formikError = true,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [count, setCount] = useState(0);
  return (
    <>
      <div className={`${inputContainer}`}>
        <label
          htmlFor={itemName}
          className={
            (formikError && formikTouched) || error
              ? `fs_16 fw_500 mb-1 mt-2 red_color`
              : `fs_16 fw_500 mb-1 mt-2 primary_color`
          }
        >
          {title}
        </label>
        <div className="mb-3">
          <div className="d-flex position-relative ">
            <input
              type={passwordVisible ? "text" : "password"}
              className={
                (formikError && formikTouched) || error
                  ? ` password_error input_text_holder background_none w-100 border_radius_3px py-1 outline_none ps-2`
                  : `background_none input_text_holder w-100 border_radius_3px py-1 password_input outline_none ps-2`
              }
              placeholder={placeholder}
              name={itemName}
              // id={itemName}
              value={inputValue}
              onChange={onChangeFn}
              onBlur={onBlurFn}
              autoComplete={"off"}
              // autoFocus={true}
            />
            <div className="restore_password_visible cursor_pointer">
              <img
                onClick={() => setPasswordVisible(!passwordVisible)}
                src={passwordVisible ? eyeOn : eyeOff}
                alt="password visibility on or off"
              />
            </div>
          </div>
          {is_formikError && formikError && formikTouched && (
            <span className="red_color fw_500 fs_14">{formikError} </span>
          )}
        </div>

        {reason ? (
          <>
            <span className="d-flex justify-content-between">
              <label
                htmlFor={reasonItemName}
                className={
                  formikReasonError && formikReasonTouched
                    ? `fs_16 fw_500 mb-1 red_color`
                    : `fs_16 fw_500 mb-1 primary_color`
                }
              >
                {reasonTitle}
              </label>
              <span
                className={`${
                  count === 160 ? "red_color" : "primary_color"
                }   text-end`}
              >
                ({count}/160) characters
              </span>
            </span>

            <textarea
              type="text"
              className={
                formikReasonError && formikReasonTouched
                  ? `error_border background_none w-100 border_radius_3px py-lg-1 py-sm-2 outline_none ps-2 block_text_area input_text_holder resize_none`
                  : `background_none w-100 border_radius_3px py-lg-1 py-sm-2 password_input outline_none ps-2 block_text_area input_text_holder resize_none`
              }
              placeholder={reasonPlaceHolder}
              name={reasonItemName}
              id={reasonItemName}
              value={reasonItemValue}
              onChange={(e) => {
                onReasonChangeFn(e);
                setCount(e.target.value.length);
              }}
              onBlur={onReasonBlurFn}
              maxLength="160"
              autoFocus={true}
            />
            {is_reasonError && formikReasonError && formikReasonTouched && (
              <div className="red_color fs_14 fw_500">{formikReasonError}</div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default PasswordInputField;
