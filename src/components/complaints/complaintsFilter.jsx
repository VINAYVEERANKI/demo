import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, TextField } from "@mui/material";
// import "../adminModals.css";
import { useStyles } from "../mui-styles/mui-styles";
import moment from "moment";

const ComplaintsFilter = ({
  filter,
  handleFilterClose,
  search,
  complDropdownList,
  type = "",
}) => {
  const selectOptions = (key) =>
    Object.values(complDropdownList[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));

  const [error, setError] = useState(false);

  const initialValues = {
    complaint_id: search?.complaint_id ?? "",
    source_type: search?.source_type ?? "",
    booking_id: search?.booking_id ?? "",
    rider_id: search?.rider_id ?? "",
    driver_id: search?.driver_id ?? "",
    priority_type: search?.priority_type ?? "",
    complaint_type: search?.complaint_type ?? "",
    complaint_title: search?.complaint_title ?? "",
    complaint_status: search?.complaint_status ?? "",
    current_owner: search?.current_owner ?? "",
    resolved_by: search?.resolved_by ?? "",
    closed_by: search?.closed_by ?? "",
    generated_at: search?.generated_at ?? "",
    type: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      const hasValues = Object.values(values).some((val) => Boolean(val));
      if (!hasValues) {
        console.log("Please fill out at least one field.");
        setError(true);
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
  const classes = useStyles();

  const RenderSelectField = (name, label, shouldFilterOptions) => (
    <Autocomplete
      value={
        selectOptions(name).find(
          (option) => option.value === formik.values[name]
        ) || null
      }
      onChange={(event, newValue) => {
        formik.setFieldValue(name, newValue?.value || "");
        setError(false);
      }}
      clearIcon={null}
      style={{ width: "15rem" }}
      className={classes.autocomplete}
      getOptionLabel={(option) => {
        const timestamp = moment(option.label);
        if (timestamp.isValid()) {
          return timestamp.format("D-M-YYYY,HH:mm");
        } else {
          return option.label;
        }
      }}
      options={selectOptions(name)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      filterOptions={
        shouldFilterOptions === true
          ? (options, { inputValue }) =>
              inputValue
                ? options.filter((option) =>
                    option.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                : [{ label: "" }]
          : undefined
      }
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
        <div className="mt-3 col-lg-6">
          {RenderSelectField("complaint_id", "Complaint ID", true)}
        </div>
        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 col-lg-6">
          {RenderSelectField("booking_id", "Booking ID", true)}
        </div>
        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 col-lg-6">
          {type === "riderPendingComplaints" ||
          type === "riderInprogressComplaints" ||
          type === "riderResolvedClosedComplaints" ? (
            <>
              <div className="my-3 my-lg-0">
                {RenderSelectField("rider_id", "Rider ID", true)}
              </div>
            </>
          ) : type === "driverPendingComplaints" ||
            type === "driverInprogressComplaints" ||
            type === "driverResolvedClosedComplaints" ? (
            <>
              <div className="my-3 my-lg-0">
                {RenderSelectField("driver_id", "Driver ID", true)}
              </div>
            </>
          ) : null}
        </div>
        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 d-lg-flex gap-3">
          {RenderSelectField("source_type", "Source Type")}
          <div className="my-3 my-lg-0">
            {RenderSelectField("priority_type", "Priority Type")}
          </div>
          <div className="my-3 my-lg-0">
            {RenderSelectField("complaint_type", "Complaint Type")}
          </div>
        </div>
        <div className="mt-3 d-lg-flex gap-3">
          {type === "riderPendingComplaints" ||
          type === "driverPendingComplaints" ? (
            <>
              {RenderSelectField("complaint_title", "Complaint Title")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("generated_at", "Generated At")}
              </div>
            </>
          ) : type === "riderInprogressComplaints" ||
            type === "driverInprogressComplaints" ? (
            <>
              {RenderSelectField("complaint_title", "Complaint Title")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("current_owner", "Current Owner")}
              </div>
              <div className="my-3 my-lg-0">
                {RenderSelectField("generated_at", "Generated At", true)}
              </div>
            </>
          ) : type === "riderResolvedClosedComplaints" ||
            type === "driverResolvedClosedComplaints" ? (
            <>
              {RenderSelectField("generated_at", "Generated At", true)}
              <div className="my-3 my-lg-0">
                {RenderSelectField("complaint_status", "Status")}
              </div>
              <div className="my-3 my-lg-0">
                {RenderSelectField("resolved_by", "Resolved By")}
              </div>
            </>
          ) : (
            <></>
          )}
          {/* {RenderSelectField("source_type", "Source Type")}
          <div className="my-3 my-lg-0">
            {RenderSelectField("priority_type", "Priority Type")}
          </div>
          <div className="my-3 my-lg-0">
            {RenderSelectField("complaint_type", "Complaint Type")}
          </div> */}
        </div>
        {/* <div className="mt-3 d-lg-flex gap-3">
          {type === "riderPendingComplaints" ||
          type === "riderInprogressComplaints" ? (
            <>
              {RenderSelectField("complaint_title", "Complaint Title")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("generated_at", "Generated At")}
              </div>
            </>
          ) : type === "riderResolvedClosedComplaints" ? (
            <></>
          ) : (
            <></>
          )} */}
        {/* {RenderSelectField("source_type", "Source Type")}
          <div className="my-3 my-lg-0">
            {RenderSelectField("priority_type", "Priority Type")}
          </div>
          <div className="my-3 my-lg-0">
            {RenderSelectField("complaint_type", "Complaint Type")}
          </div> */}
        {/* </div> */}

        {/* <div className="mt-3 d-lg-flex gap-3">
          {type === "riderPendingComplaints" ||
          type === "riderInprogressComplaints" ||
          type === "riderResolvedClosedComplaints" ? (
            <>
              <div className="my-3 my-lg-0"></div>
            </>
          ) : type === "driverPendingComplaints" ||
            type === "driverInprogressComplaints" ||
            type === "driverResolvedClosedComplaints" ? (
            <>
              <div className="my-3 my-lg-0">
                {RenderSelectField("driver_id", "Driver ID")}
              </div>
            </>
          ) : null}

          {RenderSelectField("priority_type", "Priority Type")}
        </div>
        <div className="mt-3 d-lg-flex gap-3">
          {RenderSelectField("complaint_type", "Complaint Type")}
          {type === "riderResolvedClosedComplaints" ||
          type === "driverResolvedClosedComplaints" ? (
            <>
              <div className="my-3 my-lg-0">
                {RenderSelectField("complaint_status", "Complaint Status")}
              </div>
            </>
          ) : (
            <>
              <div className="my-3 my-lg-0">
                {RenderSelectField("complaint_title", "Complaint Title")}
              </div>
            </>
          )}

          {type === "riderInprogressComplaints" ||
          type === "driverInprogressComplaints" ? (
            <>
              <div className="my-3 my-lg-0">
                {RenderSelectField("current_owner", "Current Owner")}
              </div>
            </>
          ) : null}
        </div>
        <div className="mt-3 d-lg-flex gap-3">
          {type === "riderResolvedClosedComplaints" ||
          type === "driverResolvedClosedComplaints" ? (
            <>
              {" "}
              {RenderSelectField("resolved_by", "Resolved By")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("closed_by", "Closed By")}
              </div>
            </>
          ) : null}
        </div>

        <div className="red_color fs_14 fw_700">
          {formik.errors.atleastOneIsRequired || validationErrorMes}
        </div> */}
        <div className="red_color fs_14 fw_700">
          {error ? "Please fill out at least one field." : ""}
        </div>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="reset"
            className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-3"
            onClick={clearFilter}
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

export default ComplaintsFilter;
