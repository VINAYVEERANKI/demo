import React from "react";
import { useFormik } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useStyles } from "../mui-styles/mui-styles";
import { useState } from "react";
import moment from "moment";

const BookingsFilter = ({
  filter,
  handleFilterClose,
  search,
  manageBookingsDropdown = {},
  type = "",
}) => {
  const selectOptions = (key) =>
    Object.values(manageBookingsDropdown[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));
  const [error, setError] = useState(false);
  const initialValues = {
    booking_id_2: search?.booking_id_2 ?? "",
    Driverfirst_name: search?.Driverfirst_name ?? "",
    Riderfirst_name: search?.Riderfirst_name ?? "",
    booking_type: search?.booking_type ?? "",
    ride_type: search?.ride_type ?? "",
    trip_duration: search?.trip_duration ?? "",
    vehicle_number: search?.vehicle_number ?? "",
    adjusted_by: search?.adjusted_by ?? "",
    booking_classification: search?.booking_classification ?? "",
    accident_reported_at: search?.accident_reported_at ?? "",
    accident_reported_by: search?.accident_reported_by ?? "",
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
    <>
      <div className="table_filter_container border_radius_7px p-3">
        <div className="d-flex add_filter_heading justify-content-between">
          <span className="text-start fs_20 fw_500 primary_color d-flex align-items-center ">
            <i className="ri-filter-3-line primary_color pe-2" /> Add Filter{" "}
          </span>
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
            {RenderSelectField("booking_id_2", "Booking ID", true)}
          </div>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          {type !== "Adjusted_Bookings" ? (
            <>
              <div className="mt-3 col-lg-6">
                {RenderSelectField("vehicle_number", "Vehicle number", true)}
              </div>
              <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
                -(or)-
              </span>
            </>
          ) : (
            <></>
          )}

          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("Riderfirst_name", "Rider Firstname", true)}
            <div className="my-3 my-lg-0">
              {RenderSelectField("Driverfirst_name", "Driver Firstname", true)}
            </div>
            <div className="my-3 my-lg-0">
              {RenderSelectField("booking_type", "Booking Type")}
            </div>
          </div>
          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("ride_type", "Ride Type")}
            {type === "Accident_Bookings" ? (
              <>
                <div className="my-3 my-lg-0">
                  {RenderSelectField(
                    "accident_reported_at",
                    "Reported At",
                    true
                  )}
                </div>
                <div className="my-3 my-lg-0">
                  {RenderSelectField("accident_reported_by", "Reported By")}
                </div>
              </>
            ) : type === "Adjusted_Bookings" ? (
              <>
                <div className="my-3 my-lg-0">
                  {RenderSelectField(
                    "booking_classification",
                    "Booking Classification"
                  )}
                </div>
                <div className="my-3 my-lg-0">
                  {RenderSelectField("adjusted_by", "Adjusted By")}
                </div>
              </>
            ) : type === "Ongoing_Bookings" ? (
              <>
                <div className="my-3 my-lg-0">
                  {RenderSelectField("trip_duration", "Trip Duration")}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="red_color fs_14 fw_700">
            {error ? "Please fill out at least one field." : ""}
          </div>
          <div className="d-flex justify-content-lg-end gap-3 mt-4 ms-sm-0 ms-2">
            <button
              type="reset"
              className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-sm-3"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
            <button
              type="submit"
              className="blue_color_bg border_none fs_16 fw_400 white_color border_radius_3px py-1 px-sm-3 px-2"
            >
              Apply Filter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookingsFilter;
