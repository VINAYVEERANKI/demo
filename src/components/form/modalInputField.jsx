import React from "react";

const ModalInputField = ({
itemName,
title,
placeholder="Enter details",
inputValue,
onChangeFn,
onBlurFn,
type="text",
disabled=false,
formikError,
formikTouched,
inputClassName="",
labelClassName="primary_color"

}) => {
  return (
    <>
      <label 
      htmlFor={itemName}
      className={`${labelClassName} fw_600 `} >
        {title}
      </label>
      <input
        className={
          formikError && formikTouched
            ? `w-100  border_radius_5px document_input_error  ${inputClassName} outline_none py-1 ps-2`
            : `w-100  border_radius_5px ${inputClassName} document_input outline_none py-1 ps-2`
        }
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
  );
};

export default ModalInputField;
