import React from "react";
import { Field } from "formik";
import ErrorMsg from "../errorMsg";
import "./inputFields.css";

const FilterInputField = ({
  name = "",
  containerClassName = " d-flex flex-column mb-1",
  labelClassName = "mb-2 dark_grey_color fn_Montserrat fw_500 fs_14 ps-2",
  placeholder = "Enter Email ID",
  label = "E-Mail",
  id,
  type = "text",
  InputFieldClassName="",
  errMsgContainerClassName = "mt-1 justify-content-end justify-content-lg-start",
}) => {
  return (
    <div className={`${containerClassName}`}>
      <label htmlFor={id} className={`${labelClassName}`}>
        {label}
      </label>
      <Field name={name}>
        {({ field, meta }) => (
          <input
            type={type}
            {...field}
            placeholder={placeholder}
            id={id}
            className={
              meta.touched && meta.error
                ? `w-100 ${InputFieldClassName}   inputField inputField_error__border rounded-3  pb-2  focus_outline__none`
                : ` w-100  ${InputFieldClassName}  inputField inputField__border f rounded-3 pb-2 focus_outline__none`
            }
          />
        )}
      </Field>
      <ErrorMsg
        containerClassName={errMsgContainerClassName}
        name={name} />
    </div>
  );
};

export default FilterInputField;