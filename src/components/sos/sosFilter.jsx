import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, TextField } from "@mui/material";
// import "../adminModals.css";
import { useStyles } from "../mui-styles/mui-styles";
import moment from "moment";

const SosFilter = ({
  filter,
  handleFilterClose,
  search,
  sosDropdownList,
  type = "",
}) => {
  const selectOptions = (key) =>
    Object.values(sosDropdownList[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));

  const initialValues = {
    sos_id: search?.sos_id ?? "",
    source_type: search?.source_type ?? "",
    booking_id: search?.booking_id ?? "",
    rider_id: search?.rider_id ?? "",
    driver_id: search?.driver_id ?? "",
    first_name: search?.first_name ?? "",
    phone_number: search?.phone_number ?? "",
    current_owner: search?.current_owner ?? "",
    type: "",
  };

  const [validationErrorMes, setValidationErrorMes] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      const hasValues = Object.values(values).some((val) => Boolean(val));
      if (!hasValues) {
        console.log("Please fill out at least one field.");
        setValidationErrorMes("Please fill out at least one field.");
        return;
      }
      filter(values);
      handleFilterClose();
    },
  });

  const clearFilter = () => {
    formik.resetForm();
    filter("");
  };

  console.log(formik.values);

  const classes = useStyles();

  const RenderSelectField = (name, label) => (
    <Autocomplete
      value={
        selectOptions(name).find(
          (option) => option.value === formik.values[name]
        ) || null
      }
      onChange={(event, newValue) => {
        formik.setFieldValue(name, newValue?.value || "");
        setValidationErrorMes("");
      }}
      clearIcon={null}
      style={{ width: "15rem" }}
      className={classes.autocomplete}
      options={selectOptions(name)}
      //   getOptionLabel={(option) => option.label}
      getOptionLabel={(option) => {
        const timestamp = moment(option.label);
        if (timestamp.isValid()) {
          return timestamp.format("D-M-YYYY,HH:mm");
        } else {
          return option.label;
        }
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
          className="dark_grey_color fw_500 fs_14"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={`Enter ${label}`}
        />
      )}
    />
  );

  return (
    <div className="table_filter_container border_radius_7px p-3">
      <div className="d-flex add_filter_heading justify-content-between">
        <span className="text-start fs_20 fw_500 primary_color d-flex align-items-center ">
          <i className="ri-filter-3-line primary_color pe-2" /> Add Filter{" "}
        </span>{" "}
        <button
          className="border_none background_none"
          onClick={() => handleFilterClose()}
          type="button"
        >
          <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-3 d-lg-flex gap-3">
          {RenderSelectField("sos_id", "SOS ID")}
          <div className="my-3 my-lg-0">
          {RenderSelectField("source_type", "Source Type")}
          </div>
        </div>

        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 d-lg-flex gap-3">
          {RenderSelectField("booking_id", "Booking ID")}
          <div className="my-3 my-lg-0">
          {RenderSelectField("rider_id", "Rider ID")}
          </div>
          <div className="my-3 my-lg-0">
          {RenderSelectField("driver_id", "Driver ID")}
          </div>
        </div>
        <div className="mt-3 d-lg-flex gap-3">
          {type === "pendingRiderSos" || type === "inprogressRiderSos" ? (
            <>
              {RenderSelectField("first_name", "Rider First Name")}
              <div className="my-3 my-lg-0">
              {RenderSelectField("phone_number", "Rider Phone Number")}
              </div>
              {type === "pendingRiderSos"
                ? null
                : RenderSelectField("current_owner", "Current Owner")}
            </>
          ) : type === "pendingDriverSos" || type === "inprogressDriverSos" ? (
            <>
              {RenderSelectField("first_name", "Driver First Name")}
              <div className="my-3 my-lg-0">
              {RenderSelectField("phone_number", "Driver Phone Number")}
              </div>
              {type === "pendingDriverSos"
                ? null
                : RenderSelectField("current_owner", "Current Owner")}
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="red_color fs_14 fw_700">
          {formik.errors.atleastOneIsRequired || validationErrorMes}
        </div>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="reset"
            className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-3"
            onClick={() => {
              clearFilter();
              setValidationErrorMes("");
            }}
          >
            Clear Filter
          </button>
          <button
            type="submit"
            className="blue_color_bg border_none fs_16 fw_400 white_color border_radius_3px py-1 px-3"
          >
            Apply Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default SosFilter;
