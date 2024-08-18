import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { newAdminStyles } from "../mui-styles/mui-styles";

const MuiField = ({
  label,
  error,
  itemName,
  itemValue,
  formikError,
  formikTouched,
  onChangeFn,
  onBlurFn,
  disabled = false,
  placeholder,
  autoFocus,
}) => {
  return (
    <>
      <TextField
        size="small"
        style={{ width: "96%" }}
        sx={newAdminStyles.select}
        // id={id}
        name={itemName}
        label={label}
        placeholder={placeholder}
        type="text"
        onBlur={onBlurFn}
        value={itemValue}
        onChange={onChangeFn}
        error={(formikTouched && Boolean(formikError))}
        helperText={formikTouched && formikError}
        InputLabelProps={{
          style: { color: "#687284", fontWeight: "500" },
          shrink: true,
        }}
        disabled={disabled}
        autoComplete="off"
        autoFocus={autoFocus}
      />
    </>
  );
};

export default MuiField;

export const teams = [
  { value: "adminTeam", label: "adminTeam" },
  { value: "manageFareTeam", label: "manageFareTeam" },
  { value: "manageDriverTeam", label: "manageDriverTeam" },
  { value: "complaintTeam", label: "complaintTeam" },
];

export const officeLocations = [
  { value: "Vijayawada", label: "Vijayawada" },
  { value: "Mysore", label: "Mysore" },
  { value: "Hunsur", label: "Hunsur" },
  { value: "Nanjangud", label: "Nanjangud" },
];
