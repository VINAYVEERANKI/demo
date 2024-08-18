import { Autocomplete, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from '../../mui-styles/mui-styles';
import moment from 'moment';

const ManageZonesFilter = (
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
    main_zone_code: search?.main_zone_code ?? "",
    zone_name: search?.zone_name ?? "",
    zone_status: search?.zone_status ?? "",
    created_on: search?.created_on ?? "",
    createdBy: search?.createdBy ?? "",
    updated_on: search?.updated_on ?? "",
    updatedBy: search?.updatedBy ?? "",
    archived_on: search?.archived_on ?? "",
    archived_by: search?.archived_by ?? "",
    blocked_at: search?.blocked_at ?? "",
    blocked_by: search?.blocked_by ?? "",
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
            {RenderSelectField("main_zone_code", "Zone ID", true)}
          </div>
         
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>

          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("zone_name", "Zone Name")}
          </div>
          {type === "ManageZones" && (
            <>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("zone_status", "Status", true)}
          </div>
            </>
          )}  
          {type === "ManageZones" || type === "ArchivedZones" ? (<>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("created_on", "Created At", true)}
            <div>
            {RenderSelectField("createdBy", "Created By")}
            </div>
          </div>
          </>) : (<></>)}
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          {type === "ManageZones" && (
            <>
            <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("updated_on", "Last Updated At", true)}
            <div>
            {RenderSelectField("updatedBy", "Last Updated By")}
            </div>
          </div>
            </>
          )}
         {type === "BlockedZones" && (
            <>
            <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("blocked_at", "Blocked On", true)}
            <div>
            {RenderSelectField("blocked_by", "Blocked By")}
            </div>
          </div> 
            </>
         )}
         {type === "ArchivedZones" && (
            <>
            <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("archived_on", "Archived On", true)}
            <div>
            {RenderSelectField("archived_by", "Archived By")}
            </div>
          </div> 
            </>
         )}
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

export default ManageZonesFilter
