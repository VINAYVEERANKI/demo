import React from "react";
import { useState } from "react";
import Select, { components } from "react-select";
import { reactSelectDriverDetails } from "../mui-styles/react-styles";
import DropDownIcon from "../../assets/icons/dropdown-icon";
import "../../components/form/inputFields.css";

const TransactionInputFields = ({
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
  TextArea = true,
  selectField = true,
  inputDisabled = false,
}) => {
  const [selectedZone, setSelectedZone] = useState([]);
  const options = [
    { value: "+", label: "+" },
    { value: "-", label: "-" },
  ];
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };
  return (
    <div className="row g-0 mt-1">
      <div className="col-5">
        {label && (
          <label
            htmlFor={itemName}
            className={
              (formikError && formikTouched) || error
                ? `red_color fs_14`
                : ` fs_14 secondary_color`
            }
          >
            {labelName}
          </label>
        )}
      </div>
      <div className="col-7">
        <div className="d-flex">
          {input && (
            <div
              className={
                (formikError && formikTouched) || error
                  ? `w-75  border_radius_5px document_input_error outline_none ps-2`
                  : `w-75  border_radius_5px document_input outline_none ps-2`
              }
            >
              <input
                className={`w-75 border_none background_none outline_none coupon_placeholder_text input_select_width`}
                type={type}
                id={itemName}
                placeholder={placeholder}
                name={itemName}
                disabled={disabled}
                value={inputValue}
                onChange={onChangeFn}
                onBlur={onBlurFn}
              />
            </div>
          )}

          {TextArea && (
            <div
              className={
                (formikError && formikTouched) || error
                  ? `w-100  border_radius_5px document_input_error outline_none ps-2 mt-1`
                  : `w-100  border_radius_5px document_input outline_none ps-2 mt-1`
              }
            >
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
            </div>
          )}
        </div>
        {formikTouched && formikError ? (
          <div className="ps-1 dark_red_color fs_14">{formikError}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TransactionInputFields;
