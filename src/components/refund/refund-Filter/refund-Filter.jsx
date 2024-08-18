import { Autocomplete, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from '../../mui-styles/mui-styles';
import moment from 'moment';

const RefundFilter = (
    {filter,
        handleFilterClose,
        search,
        driverDropDownList = {},
        type = "",
        setShowFilter}
) => {
    const selectOptions = (key) =>
  Object.values(driverDropDownList[key] || {}).map((item) => ({
    value: item[key],
    label: item[key],
  }));
  const classes = useStyles();
const [error, setError] = useState(false);
const initialValues = {
    booking_id2: search?.booking_id2 ?? "",
    rider_id2: search?.rider_id2 ?? "",
    refund_type: search?.refund_type ?? "",
    payment_method:search?.payment_method ?? "",
    created_at:search?.created_at ?? "",
    created_by: search?.created_by ?? "",
    cancelled_at: search?.cancelled_at ?? "",
    cancelled_by: search?.cancelled_by ?? "",
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
  const [toggle, setToggle] = useState(false)

  const [selectedOption, setSelectedOption] = useState('');

  const selectOptionRef = useRef(null);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectOptionRef.current && !selectOptionRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
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
            {RenderSelectField("", "Refund ID", true)}
          </div>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("booking_id2", "Booking ID", true)}
          </div>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("rider_id2", "Rider ID", true)}
          </div>
         {type !=="cancelledRefund" &&
         <>
         <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className='d-flex'>
          <div className="mt-3 col-lg-5">
            {RenderSelectField("payment_method", "Transaction Type")}
          </div>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("payment_status", "Rider Payment Status")}
          </div>
          </div>
         </>
         }
         {type==="successRefund" && 
         <>
         <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
         <div className='d-flex'>
          <div className="mt-3 col-lg-5">
            {RenderSelectField("refund_type", "Refund Type")}
          </div>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("created_at", "Created At")}
          </div>
          </div>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("", "Resolved At")}
          </div>
         </>
         }
         {type === "cancelledRefund" && 
         <>
         <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
         <div className='d-flex'>
          <div className="mt-3 col-lg-5">
            {RenderSelectField("created_at", "Created At", true)}
          </div>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("created_by", "Created By")}
          </div>
          </div>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
         <div className='d-flex'>
          <div className="mt-3 col-lg-5">
            {RenderSelectField("cancelled_at", "Cancelled At", true)}
          </div>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("cancelled_by", "Cancelled By")}
          </div>
          </div>
         </>
         }
         {type == "pendingRefund" && 
         <>
         <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("cancelled_at", "Cancelled At")}
          </div>
         </>
         }
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
  )
}

export default RefundFilter
