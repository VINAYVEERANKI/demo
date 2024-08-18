import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { couponStyles } from "../mui-styles/mui-styles";

const CouponMuiField = ({
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
  style_width,
  styles
}) => {
  return (
    <>
      <TextField
        size="small"
        style={{ width: style_width }}
        // sx={couponStyles.select}
        sx={styles}
        // id={id}
        name={itemName}
        label={label}
        placeholder={placeholder}
        type="text"
        onBlur={onBlurFn}
        value={itemValue}
        onChange={onChangeFn}
        error={(formikTouched && Boolean(formikError)) || error}
        // helperText={formikTouched && formikError}
        disabled={disabled}
        autoComplete="off"
        autoFocus={autoFocus}
      />
    </>
  );
};

export default CouponMuiField;