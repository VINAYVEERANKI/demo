import React from "react";

const CheckboxInputField = ({
  name = "",
  title,
  disabled = false,
  checkedValue,
  onChangeFn,
  labelPosition = "right",
}) => {
  return (
    <div
      className={`form-check  d-flex  ${
        labelPosition === "left" ? "" : "justify-content-between"
      }  align-items-center`}
    >
      {labelPosition === "right" && (
        <label
          className={`form-check-label fs_14  fw_600 cement_color  text-nowrap  `}
        >
          {title}
        </label>
      )}

      <input
        className="form-check-input fs_14  me-3 input_checkbox"
        type="checkbox"
        name={name}
        checked={checkedValue}
        onChange={onChangeFn}
        disabled={disabled}
      />
      {labelPosition === "left" && (
        <label
          className={`form-check-label text-left fs_14  fw_600 cement_color  text-nowrap  `}
        >
          {title}
        </label>
      )}
    </div>
  );
};

export default CheckboxInputField;

export const featurePermissionList = [
  "admin",
  "dashboard",
  "gods_view",
  "ride_type",
  "manage_fares",
  "manage_zones",
  "manage_riders",
  "manage_drivers",
  "manage_bookings",
];

export const EditfeaturePermissionList = [
  "admin",
  "dashboard",
  "gods_view",
  "ride_type",
  "manage_fares",
  "manage_zones",
  "manage_riders",
  "manage_drivers",
  "manage_bookings",
];
