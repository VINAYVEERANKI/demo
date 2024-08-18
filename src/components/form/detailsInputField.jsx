import React from "react";
import CheckBox from "../../assets/icons/green-checkbox-icon.svg";

const DetailsInputField = ({
  formik,
  itemName,
  inputValue,
  onChangeFn,
  disabled = false,
  placeholder = "--",
  onBlurFn,
  label,
  staticValue,
  staticContent,
  dynamicContent = true,
  type = "text",
  isVerified = false,
  formikError,
  formikTouched,
  input_width = "w-100",
  first_col = "col-5",
  second_col = "col-7",
  align_items = "align-items-center",
  label_color = "primary_color",
}) => {
  return (
    <>
      <div className={`row my-1 gx-0 ${align_items}`}>
        <div className={`${first_col}`}>
          <label
            className={`${
              formikError && formikTouched
                ? "fs_14 red_color fw_500"
                : "fs_14 disabled_color fw_500"
            }`}
          >
            {label}
          </label>
        </div>
        <div className={`${second_col}`}>
          <>
            {dynamicContent &&
              (type === "text" ? (
                <div
                  className={`${
                    disabled
                      ? "border_none background_none ps-1"
                      : formikError && formikTouched
                      ? `error_border border_radius_3px outline_none ps-1`
                      : `registration_input border_radius_3px outline_none ps-1`
                  } w-100 d-flex justify-content-between`}
                >
                  <input
                    className={`border_none outline_none background_none primary_color fs_14 fw_500 ${input_width}`}
                    name={itemName}
                    id={itemName}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                    disabled={disabled}
                    // style={{ width: `${(inputValue.length + 2) * 8}px` }}
                  />
                  {isVerified && (
                    <div className="d-flex align-items-center pe-2">
                      <img
                        src={CheckBox}
                        className="green_checkbox_icon"
                        alt="..."
                      />
                      <span className="fs_10 fw_700 green_color ps-1">
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              ) : type === "date" ? (
                <div
                  className={`${
                    disabled
                      ? "border_none background_none ps-1"
                      : formikError && formikTouched
                      ? `error_border border_radius_3px outline_none ps-1`
                      : `registration_input border_radius_3px outline_none ps-1`
                  }`}
                >
                  <input
                    type="Date"
                    className="border_none outline_none background_none w-100 primary_color fs_14 fw_500"
                    name={itemName}
                    id={itemName}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                    disabled={disabled}
                  />
                </div>
              ) : type === "textArea" ? (
                <div className={``}>
                  <textarea
                    type="text"
                    className={`${
                      disabled
                        ? "border_none background_none ps-1 registration_input resize_none admin_comment_text_area_container primary_color fs_500"
                        : formik.errors.adminComments &&
                          formik.touched.adminComments
                        ? "red_color  fw_500  border_radius_3px outline_none fs_14 error_border resize_none ps-2 admin_comments_input admin_comment_text_area_container"
                        : "primary_color fs_14 fw_500  outline_none border_radius_5px input_border resize_none ps-2 registration_input admin_comments_input admin_comment_text_area_container"
                    } w-100 `}
                    name={itemName}
                    id={itemName}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                    disabled={disabled}
                  />
                </div>
              ) : null)}
            {staticContent && (
              <div className="">
                <span className={`ps-2 ${label_color} fs_14 fw_500`}>
                  {staticValue}
                </span>
              </div>
            )}
          </>
          <div>
            {formikError && formikTouched && (
              <span className="dark_red_color fs_13">{formikError}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsInputField;
