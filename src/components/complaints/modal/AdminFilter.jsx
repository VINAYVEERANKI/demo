import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";
import { useStyles } from "../../mui-styles/mui-styles";

const AdminFilter = ({
  filter,
  handleFilterClose,
  search,
  complDropdownList,
  //   type = "",
}) => {
  const selectOptions = (key) =>
    Object.values(complDropdownList[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));

  const initialValues = {
    admin_id: search?.admin_id ?? "",
    first_name: search?.first_name ?? "",
    last_name: search?.ast_name ?? "",
    job_title: search?.job_title ?? "",
    team: search?.team ?? "",
    location: search?.location ?? "",
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

  const classes = useStyles();

  const clearFilter = () => {
    formik.resetForm();
    filter("");
  };

  console.log(formik.values);

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
          className="dark_grey_color fw_500 fs_14 "
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
        {/* <div className="d-flex justify-content-center ">
          <div>
          <div className="mt-3 d-lg-flex gap-3">
          {RenderSelectField("admin_id", "Admin ID")}
        </div>

        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 d-sm-flex gap-md-3 gap-2">
          {RenderSelectField("first_name", "First Type")}
          {RenderSelectField("last_name", "Last Name")}
          {RenderSelectField("job_title", "Admin Job Title")}
        </div>
        <div className="mt-3 d-sm-flex gap-3">
          {RenderSelectField("team", "Admin Team")}
          {RenderSelectField("location", "Admin Location")}
        </div>
          </div>
        </div> */}
        <div className="mt-3 d-lg-flex gap-3 ">
          {RenderSelectField("admin_id", "Admin ID")}
        </div>

        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 d-md-flex gap-md-3 gap-2 ">
          <div className="pb-3 pb-md-0">{RenderSelectField("first_name", "First Type")}</div>
          <div className="pb-3 pb-md-0">{RenderSelectField("last_name", "Last Name")}</div>
          {RenderSelectField("job_title", "Admin Job Title")}
        </div>
        <div className="mt-3 d-md-flex gap-3 ">
          <div className="pb-3 pb-md-0">{RenderSelectField("team", "Admin Team")}</div>
          {RenderSelectField("location", "Admin Location")}
        </div>

        <div className="red_color fs_14 fw_700">
          {formik.errors.atleastOneIsRequired || validationErrorMes}
        </div>
        <div className="d-flex justify-content-md-end  gap-3 mt-4">
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

export default AdminFilter;
