import React from "react";

const CouponCheckboxField = ({
  formikError,
  formikTouched,
  itemName,
  onChangeFn = () => {},
  labelName = "",
  labelColor = false,
  className = "",
  formikValue,
  disabled = false,
  fontsize = "16px",
}) => {
  return (
    <div className={`${className}`}>
      <input
        type="checkbox"
        id={itemName}
        name={itemName}
        onChange={onChangeFn}
        checked={formikValue}
        disabled={disabled}
      />
      <label
        className={
          formikError && formikTouched
            ? `ps-2 ${fontsize} red_color fw_500 text_underline `
            : `ps-2 ${fontsize}  fw_500 text_underline primary_color ${
                labelColor === true ? "primary_color" : "disabled_color"
              }`
        }
        htmlFor={itemName}
      >
        {labelName}
      </label>
    </div>
  );
};

export default CouponCheckboxField;
