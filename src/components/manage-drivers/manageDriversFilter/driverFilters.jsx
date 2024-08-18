import { Autocomplete, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from '../../mui-styles/mui-styles';
import moment from 'moment';

const DriverFilter = (
  {filter,
  handleFilterClose,
  search,
  driverDropDownList = {},
  type = "",
  setShowFilter}
) => {
//   const selectOptions = (key) =>
//   Object.values(driverDropDownList[key] || {}).map((item) => ({
//     value: item[key],
//     label: item[key],
//   }));
 

const selectOptions = (key) =>
  Object.values(driverDropDownList[key] || {}).map((item) => ({
    value: item[key],
    label: item[key],
  }));
const [error, setError] = useState(false);

const initialValues = {
  driver_id2: search?.driver_id2 ?? "",
  first_name: search?.first_name ?? "",
  last_name: search?.last_name ?? "",
  email: search?.email ?? "",
  driving_license_id:search?.driving_license_id??"",
  phone_number: search?.phone_number ?? "",
  blocked_by: search?.blocked_by ?? "",
  blocked_at:search?.blocked_at??"",
  deleted_by: search?.deleted_by ?? "",
  permanently_deleted_on: search?.permanently_deleted_on ?? "",
  expired_documents: search?.expired_documents ?? "",
  rejected_at: search?.rejected_at ?? "",
  permanently_deleted_by:search?.permanently_deleted_by??"",
  rejected_by:search?.rejected_by??"",
  deleted_at:search?.deleted_at??"",
  bannedBy:search?.bannedBy??"",
  banned_at:search?.banned_at??"",
  doc_details:search?.doc_details??"",
  doc_status:search?.doc_status??"",
  registered_zone:search?.registered_zone ?? "",
  updated_by:search?.updated_by??"",
  type: "",
};
// console.log(search, "aaa");
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
// const [inputValue, setInputValue] = useState(null);
// console.log(inputValue, "inputValue");

// const RenderSelectField = (name, label) => (
//   <Autocomplete
//     value={
//       selectOptions(name).find(
//         (option) => option.value === formik.values[name]
//       ) || null
//     }
//     onChange={(event, newValue) => {
//       formik.setFieldValue(name, newValue?.value || "");
//       setError(false);
//     }}
//     clearIcon={null}
//     style={{ width: "15rem" }}
//     className={classes.autocomplete}
//     options={selectOptions(name)}
//     getOptionLabel={(option) => option.label}
//     isOptionEqualToValue={(option, value) => option.value === value.value}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         label={label}
//         variant="outlined"
//         error={formik.touched[name] && Boolean(formik.errors[name])}
//         helperText={formik.touched[name] && formik.errors[name]}
//         className="dark_grey_color fw_500 fs_14"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         placeholder={`Enter ${label}`}
//       />
//     )}
//   />
// );
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
const [click, setClick] = useState(false);
const handleClick = () => {
  if (click) {
    setClick(false);
  } else {
    setClick(true);
  }
};

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
 
const [input, setInput]=useState(null);
// console.log(input);
// const [inputValue, setInputValue] = useState(null);
// console.log(inputValue, "inputValue");
// const handleInputChange = (event) => {
//   setInputValue(event.target.value);
// };

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
{/* 
        <div>
          <input type='text'  value={inputValue} placeholder='Enter Driver Id' onChange={(e)=>{setInputValue(e.target.value)}}/>
        </div>
        { inputValue !== null ? "" : <div className="mt-3 col-lg-6">
            {RenderSelectField("driver_id2", "Driver ID")}
          </div>} */}
          
          {/* {inputValue !== null && 
          <div className="mt-3 col-lg-6">
            {RenderSelectField("driver_id2", "Driver ID")}
          </div>} */}
          <div className="mt-3 col-lg-6">
            {RenderSelectField("driver_id2", "Driver ID", true)}
          </div>
          {type==="manageDrivers" || type==="pendApplFilter" || type==="rejectApplication" &&
          <>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("phone_number", "Phone Number", true)}
          </div>
          </>
          }
          {/* <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("phone_number", "Phone Number", true)}
          </div> */}
          {type==="pendApplFilter" &&
          <>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("", "Application ID", true)}
          </div>
          </>
          }
          {type==="deletedDrivers"||type==="permanentlyDeletedDrivers"||type=="manageDrivers"||type==="blockedDrivers"||type==="bannedApplication"?(<>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("driving_license_id", "Driver License ID",true)}
          </div>
          </>):(<></>)}
         
          {type=="manageDrivers"?(<>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("phone_number", "Phone Number", true)}
          </div>
          </>):(<></>)}
          {type==="deletedDrivers"||type=="manageDrivers"?(<>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("email", "Email ID", true)}
          </div>
          </>):(<></>)}
          {type==="rejectApplication" &&
          <>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("", "Submitted At ", true)}
          </div>
          </>
          }
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>

          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("first_name", "First Name", true)}
            <div className="my-3 my-lg-0">
              {RenderSelectField("last_name", "Last Name ", true)}
            </div>
            <div className="my-3 my-lg-0">
              {RenderSelectField("registered_zone", "Zone")}
            </div>
           
            {/* <div className="my-3 my-lg-0">
           
              {type === "blockedDrivers" ? (
                RenderSelectField("blocked_by", "Blocked By")
              ) : type === "deletedDrivers" ? (
                RenderSelectField("deleted_by", "Deleted By")
              ) : type === "permanentlyDeletedDrivers" ? (
                RenderSelectField(
                  "permanently_deleted_on",
                  "Permanently Deleted On"
                )
              ) : type === "bannedApplication" ? (
                RenderSelectField("banned_at", "Banned At")
              ) : type === "expiredDocuments" ? (
                RenderSelectField("expired_documents", "Expired Documents")
              ) : type === "rejectApplication" ? (
                RenderSelectField("rejected_at", "Rejected At")
              ) : (
                <></>
              )}
            </div> */}
          </div>
          {type==="rejectApplication"||type=="manageDrivers"  ?(<>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("driver_type", "Driver Type")}
          </div>
          </>):(<></>)}
          {type==="pendApplFilter" ?(<>
            <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("updated_by", "Current Admin", true)}
            <div className="my-3 my-lg-0">
              {RenderSelectField("doc_status", "Status")}
            </div>
            <div className="my-3 my-lg-0">
              {RenderSelectField("doc_details", "Details")}
            </div>
          </div>
          </>):(<></>)}
             {type === "deletedDrivers"  ? (
                <>
                <div className="mt-3 d-lg-flex gap-3">
            
                {RenderSelectField("driver_type", "Driver Type")}       
                {RenderSelectField("deleted_at", "Deleted On", true)}
                {RenderSelectField("deleted_by", "Deleted By")}
                </div>
                </>
             ) : (
               <></>
                )}
            {type === "permanentlyDeletedDrivers" ? (
                <>
                <div className="mt-3 d-lg-flex gap-3">
                {RenderSelectField("driver_type", "Driver Type")}           
                {RenderSelectField("permanently_deleted_on", "Deleted On", true)}
                {RenderSelectField("permanently_deleted_by", "Deleted By")}
                </div>
                </>
                ):(<></>)}
                {type === "rejectApplication" ? (
                <>
                <div className="mt-3 d-lg-flex gap-3">
                {RenderSelectField("rejected_at", "Rejected At")}           
                {RenderSelectField("rejected_by", "Rejected By", true)}
                </div>
                </>
                ):(<></>)}
                {type === "bannedApplication" ? (
                <>
                <div className="mt-3 d-lg-flex gap-3">
                {RenderSelectField("banned_at", "Banned At", true)}           
                {RenderSelectField("bannedBy", "Banned By")}
                </div>
                </>
                ):(<></>)}
                {type === "blockedDrivers" ? (
                <>
                <div className="mt-3 d-lg-flex gap-3">
                {RenderSelectField("blocked_at", "Blocked At")}           
                {RenderSelectField("blocked_by", "Blocked By", true)}
                </div>
                </>
                ):(<></>)}
                {type=="manageDrivers"?(<></>):(<></>)}
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

export default DriverFilter
