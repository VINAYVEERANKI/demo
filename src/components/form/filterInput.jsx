import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { newAdminStyles } from "../mui-styles/mui-styles";
import { Field } from "formik";

const FilterInput = ({
  label,
  itemName,
  itemValue,
  formikError,
  formikTouched,
  onChangeFn,
  onBlurFn,
  disabled = false,
  placeholder,
}) => {
  return (
    <>
    <Field name={itemName}>
   
      {({ field, meta }) => (
            <TextField
            size="small"
            {...field}
            style={{ width: "16rem" }}
            sx={newAdminStyles.select}
            id={itemName}
            name={itemName}
            label={label}
            placeholder={placeholder}
            type="text"
            // onBlur={onBlurFn}
            // value={itemValue}
            // onChange={onChangeFn}
            // error={formikTouched && Boolean(formikError)}
            // helperText={formikTouched && formikError}
            disabled={disabled}
            // autoComplete="off"
          />
        )}
      </Field>
    </>
  );
};


export default FilterInput